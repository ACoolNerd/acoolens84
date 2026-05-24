# Xcode Integration Guide: LA28Lens Hybrid iOS & AR Telemetry Wrapper

This guide documents how to import the **LA28Lens** project into **Xcode 17+** on macOS and wrap it as a hybrid iOS application with support for the emulated **LA84 Sunglasses AR HUD Telemetry** stream.

---

## 🛠️ Step-by-Step Xcode Setup

### 1. Create a New Xcode Project
1. Open **Xcode** and select **File > New > Project...**
2. Choose **iOS > App** and click **Next**.
3. Set the following project settings:
   - **Product Name:** `LA28Lens`
   - **Organization Identifier:** `com.acoolcollector.la28`
   - **Interface:** `Storyboard` or `SwiftUI`
   - **Language:** `Swift`
4. Click **Next** and save the project under `/Users/acoolnerd/Desktop/LA28/LA28Lens_iOS`.

### 2. Configure target for Hybrid Web Embedding
We wrap the Express application or embed the raw web build components natively using **WebKit**.

Create a new file `WebViewController.swift` and paste the following implementation:

```swift
import UIKit
import WebKit

class WebViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // 1. Initialize WebKit configuration
        let config = WKWebViewConfiguration()
        let contentController = WKUserContentController()
        
        // Register custom native gesture and telemetry message handlers
        contentController.add(self, name: "antigravityTelemetry")
        contentController.add(self, name: "hudGestures")
        config.userContentController = contentController
        
        // 2. Setup WebView with glassmorphic background support
        webView = WKWebView(frame: self.view.bounds, configuration: config)
        webView.navigationDelegate = self
        webView.backgroundColor = UIColor(red: 0.03, green: 0.04, blue: 0.05, alpha: 1.0)
        webView.scrollView.backgroundColor = .clear
        
        self.view.addSubview(webView)
        
        // 3. Connect to the local emulated Express port
        if let url = URL(string: "http://localhost:3030") {
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }
    
    // MARK: - WKScriptMessageHandler
    // Receives telemetry and simulated hand gestures from JavaScript HUD stream
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "hudGestures" {
            guard let gestureType = message.body as? String else { return }
            print("📱 [Xcode Native] Hand Gesture Recognized: \(gestureType.uppercased())")
            
            // Handle native actions based on smart-glasses gesture (Pinch, Swipe, Wave)
            switch gestureType {
            case "pinch":
                triggerNativeHapticFeedback(.success)
            case "swipe":
                triggerNativeHapticFeedback(.selection)
            case "wave":
                triggerNativeHapticFeedback(.warning)
            default:
                break
            }
        }
    }
    
    private func triggerNativeHapticFeedback(_ style: UINotificationFeedbackGenerator.FeedbackType) {
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(style)
    }
}
```

### 3. Add Info.plist App Transport Security Permissions
Since the web view loads standard `http://localhost`, you must allow local HTTP loads in your `Info.plist`:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsLocalNetworking</key>
    <true/>
</dict>
```

---

## 🕶️ LA84 Sunglasses HUD Swift Module Stub
To emulate zero-latency hardware calculations for slope grade and coordinate mapping, you can compile and link this Swift module:

```swift
import Foundation
import CoreLocation

/// Emulates real-time telemetry inputs from smart-glass sensors
public final class LA84GlassesTelemetryManager {
    public static let shared = LA84GlassesTelemetryManager()
    
    private init() {}
    
    public struct HUDDataPayload {
        public let latitude: Double
        public let longitude: Double
        public let gradeSlope: Double
        public let seatPriceBracket: Character
        public let crowdDensity: Double
    }
    
    /// Generates mock telemetry data based on active Olympic venue focal point
    public func getTelemetryPayload(for venue: String) -> HUDDataPayload {
        switch venue.lowercased() {
        case "coliseum":
            return HUDDataPayload(latitude: 34.0141, longitude: -118.2878, gradeSlope: 2.1, seatPriceBracket: "C", crowdDensity: 0.12)
        case "sofi":
            return HUDDataPayload(latitude: 33.9534, longitude: -118.3387, gradeSlope: 1.5, seatPriceBracket: "B", crowdDensity: 0.45)
        case "valley":
            return HUDDataPayload(latitude: 34.1722, longitude: -118.5042, gradeSlope: 0.8, seatPriceBracket: "D", crowdDensity: 0.08)
        default:
            return HUDDataPayload(latitude: 34.0522, longitude: -118.2437, gradeSlope: 1.8, seatPriceBracket: "A", crowdDensity: 0.25)
        }
    }
}
```
