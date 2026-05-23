import urllib.request
import re

url = "https://docs.google.com/spreadsheets/d/13uiZ5ZI7FG8XyOVFcZ08_XVH1udFWic7m0CFIoiELSw/edit"

req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    print("Fetched HTML successfully! Length:", len(html))
    
    # Search for "V2" case-sensitively or case-insensitively and print adjacent text
    matches = [m.start() for m in re.finditer("V2", html, re.IGNORECASE)]
    print(f"Found {len(matches)} occurrences of 'V2' (ignorecase)")
    for idx, pos in enumerate(matches):
        context = html[max(0, pos-80):pos+80]
        # Clean up any newlines or spaces for printing
        context_clean = context.replace('\n', ' ').replace('\r', ' ')
        print(f"Match {idx} at {pos}: ... {context_clean} ...")
        
except Exception as e:
    print("Error:", e)
