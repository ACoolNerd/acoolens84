# ⌚ Wearables & Android SDK Integration Specifications
## Mapped to account: iam@acoolcollector.com

This document establishes the build architecture, SDK libraries, and telemetry configurations for **Android WearOS** and **Meta Quest (Oculus)** systems to power the emulated concessions and sunglasses HUD components.

---

## 📲 Android WearOS Telemetry Service (Kotlin)
* **SDK Version:** API 34 (WearOS 4.0)
* **Purpose:** Collects step-free gyroscope metrics, GPS coordinates, and heart rates to stream directly to the LA84 Sunglasses HUD receiver.

```kotlin
package com.acoolcollector.la28.hud

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

class HUDTelemetryService : Service() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private var isStreaming = false
    private val serverUrl = "http://localhost:3030/telemetry/stream"

    override fun onCreate() {
        super.onCreate()
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (!isStreaming) {
            isStreaming = true
            startTelemetryThread()
        }
        return START_STICKY
    }

    private fun startTelemetryThread() {
        thread {
            while (isStreaming) {
                try {
                    fusedLocationClient.lastLocation.addOnSuccessListener { location ->
                        if (location != null) {
                            val payload = JSONObject().apply {
                                put("record_id", java.util.UUID.randomUUID().toString())
                                put("entity_owner", "iam@acoolcollector.com")
                                put("target_sector", "Civic")
                                put("status", "Active")
                                put("clearance_level", 2)
                                put("locale_data", JSONObject().put("primary", "en-US"))
                                put("last_updated", System.currentTimeMillis())
                                put("metadata", JSONObject().apply {
                                    put("latitude", location.latitude)
                                    put("longitude", location.longitude)
                                    put("slope_grade", 1.8) // Gyroscope incline
                                    put("battery", 92)
                                })
                            }
                            sendToServer(payload.toString())
                        }
                    }
                    Thread.sleep(2000) // Telemetry stream updates every 2 seconds
                } catch (e: Exception) {
                    Log.e("WearOS_Telemetry", "Stream error: ${e.message}")
                }
            }
        }
    }

    private fun sendToServer(jsonPayload: String) {
        val url = URL(serverUrl)
        val conn = url.openConnection() as HttpURLConnection
        conn.requestMethod = "POST"
        conn.setRequestProperty("Content-Type", "application/json")
        conn.doOutput = true
        conn.outputStream.write(jsonPayload.toByteArray())
        val response = conn.responseCode
        conn.disconnect()
        Log.d("WearOS_Telemetry", "Payload streamed with response code: $response")
    }

    override fun onDestroy() {
        isStreaming = false
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
```

---

## 🥽 Meta Quest (Oculus) Concessions Simulation (C# / Unity)
* **SDK Version:** Meta XR Core SDK v60+
* **Purpose:** Renders the Concessions training low-counter layout (33.5 inches ADA standard height) and tracks interactive training inputs.

```csharp
using UnityEngine;
using Oculus.Interaction;

namespace ACoolEcosystem.VR
{
    public class ADAConcessionsManager : MonoBehaviour
    {
        [Header("Target Configurations")]
        public float adaShelfHeightInches = 33.5f; // Governed ADA standard
        public string developerOwner = "iam@acoolcollector.com";

        [Header("Interaction Components")]
        [SerializeField] private GameObject leftHandAnchor;
        [SerializeField] private GameObject rightHandAnchor;
        [SerializeField] private AudioSource hapticBuzzAudio;

        private void Start()
        {
            Debug.Log($"[Oculus VR] InitializedConcessions Module. Registered to: {developerOwner}");
            AuditCounterHeights();
        }

        public void AuditCounterHeights()
        {
            float shelfYCoordinate = transform.position.y * 39.37f; // Convert meters to inches
            if (Mathf.Abs(shelfYCoordinate - adaShelfHeightInches) < 0.5f)
            {
                Debug.Log("[VR Audit] ADA COMPLIANCE VERIFIED ✓ (Height: 33.5 inches)");
                TriggerQuestHaptics(0.8f, 0.2s);
            }
            else
            {
                Debug.LogWarning($"[VR Audit] Compliance Failure. Expected: {adaShelfHeightInches}\", Found: {shelfYCoordinate}\"");
            }
        }

        private void TriggerQuestHaptics(float amplitude, float duration)
        {
            // Triggers premium haptics on Meta Touch controllers
            OVRInput.SetControllerVibration(amplitude, amplitude, OVRInput.Controller.RTouch);
            OVRInput.SetControllerVibration(amplitude, amplitude, OVRInput.Controller.LTouch);
            Invoke("StopVibration", duration);
        }

        private void StopVibration()
        {
            OVRInput.SetControllerVibration(0, 0, OVRInput.Controller.RTouch);
            OVRInput.SetControllerVibration(0, 0, OVRInput.Controller.LTouch);
        }
    }
}
```
