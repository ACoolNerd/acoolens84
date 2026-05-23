import urllib.request
import os

url = "https://docs.google.com/spreadsheets/d/13uiZ5ZI7FG8XyOVFcZ08_XVH1udFWic7m0CFIoiELSw/export?format=xlsx"
output_path = "/Users/acoolnerd/Desktop/LA28/LA28Lens/la28_schedule.xlsx"

req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
)

try:
    print("Downloading Excel sheet...")
    with urllib.request.urlopen(req) as response:
        with open(output_path, 'wb') as f:
            f.write(response.read())
    print("Download completed successfully! File saved to:", output_path)
    
    # Let's inspect the sheet names using standard zipfile if we don't have openpyxl
    import zipfile
    import xml.etree.ElementTree as ET
    
    with zipfile.ZipFile(output_path, 'r') as zip_ref:
        workbook_xml = zip_ref.read('xl/workbook.xml')
        root = ET.fromstring(workbook_xml)
        
        # Namespaces are usually in workbook.xml
        # Look for sheet tags
        print("Sheets found in workbook:")
        for child in root.iter():
            if child.tag.endswith('sheet'):
                print(child.attrib)
                
except Exception as e:
    print("Error:", e)
