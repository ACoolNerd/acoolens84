# ACCESSFriendly LA28 - Startup Funding & Grant Application Guide

This guide compiles the actual, real-world programs and draft responses you can use to secure cloud credits, financial backing, and mentorship from Google and AWS for your accessibility-first transit platform.

---

## 1. Google for Startups Accelerator: Black Founders
Google provides equity-free support, technical mentorship, and up to $100,000 in Google Cloud credits for high-potential Black-led startups in the US.

*   **Official Program Link:** [Google for Startups Accelerator: Black Founders](https://startup.google.com/accelerators/black-founders/)
*   **Key Criteria:** Seed to Series A startup, tech-product based, led by a Black founder.

### Draft Application Responses:

*   **Startup Description (150 words):**
    > "ACCESSFriendly is a civic-tech transit companion platform designed to ensure 100% independent mobility for wheelchair users, older adults, and paratransit riders during the LA28 Olympic and Paralympic Games. By integrating real-time GTFS transit data with active municipal elevator status tracking, our app dynamically routes users around physical barriers like broken elevators, steep slopes, and blocked curb cuts. Founded by Keith McPherson, a wheelchair user who experiences these micro-barriers daily, our platform elevates accessible city routing from simple navigation to dynamic paratransit wayfinding."
*   **What technical problem are you hoping to solve with Google mentorship?**
    > "We want to build on the Google Maps Platform (Directions API, Street View, and 3D Photorealistic Tiles) to show step-free path elevations. We are looking for mentorship from Google's Accessibility Engineering team to align our routing algorithms with best practices for wheelchair navigation and integrate active elevator out-of-service APIs."

---

## 2. AWS Black Founders Build Initiative
AWS offers a collaborative program providing technical support, business mentorship, and up to $100,000 in AWS Promotional Credits to help Black-led startups accelerate product development.

*   **Official Program Link:** [AWS Black Founders Build Initiative](https://aws.amazon.com/startups/accelerators/black-founders-build/)
*   **Key Benefits:** AWS Credits, 1:1 architectural reviews with AWS Solutions Architects, exposure to venture capital partners.

### Draft Tech Stack Implementation Pitch (AWS):
*   **Frontend:** Hosted on **AWS Amplify** or static **Amazon S3** combined with **CloudFront** for global multi-language caching.
*   **API Engine:** Serverless routing calculated via **AWS Lambda** (Node.js) to minimize operating costs.
*   **Database:** Real-time GTFS and elevator logs managed using **Amazon RDS (PostgreSQL with PostGIS)** for advanced geographic and routing math.
*   **Transit Alerts:** Live SMS notifications regarding elevator outages powered by **Amazon SNS**.

---

## 3. Google for Nonprofits
If you establish ACCESSFriendly as a registered 501(c)(3) nonprofit, you can unlock substantial free resources, including **$10,000/month in Google Search Ads** to promote your accessibility tools, and free Google Workspace accounts.

*   **Official Program Link:** [Google for Nonprofits](https://www.google.com/nonprofits/)
*   **Core Eligibility:** Verified 501(c)(3) organization status in the United States.
*   **Benefits:**
    *   **Google Ad Grants:** Promote your accessible transit routing app to sports fans searching for LA28 venue details.
    *   **Google Maps Platform Credits:** $250/month in free API usage to power your Street View and location searches.

---

## 🚀 Concrete Next Steps to Launch:
1.  **Incorporate:** Formally register your business as a Delaware C-Corp (for tech startups seeking VC backing) or a 501(c)(3) Nonprofit (for public paratransit/civic-tech grants).
2.  **Apply for Cloud Credits:** Use the drafts above to apply to the Google Cloud for Startups program and AWS Activate program to secure free server hosting.
3.  **Establish Git:** Push this codebase to your public or private GitHub repository to demonstrate your working prototype to program judges.
