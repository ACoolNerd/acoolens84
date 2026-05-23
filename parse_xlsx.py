import zipfile
import xml.etree.ElementTree as ET
import os
import datetime
import json

xlsx_path = "/Users/acoolnerd/Desktop/LA28/LA28Lens/la28_schedule.xlsx"
json_output_path = "/Users/acoolnerd/Desktop/LA28/LA28Lens/la28_events.json"

def excel_date_to_str(serial):
    try:
        val = float(serial)
        dt = datetime.date(1899, 12, 30) + datetime.timedelta(days=int(val))
        return dt.strftime("%Y-%m-%d (%A)")
    except Exception:
        return str(serial)

def excel_time_to_str(serial):
    try:
        val = float(serial)
        total_minutes = int(round(val * 24 * 60))
        hours = total_minutes // 60
        minutes = total_minutes % 60
        return f"{hours:02d}:{minutes:02d}"
    except Exception:
        return str(serial)

def try_float(val):
    if not val:
        return None
    val_clean = val.replace('$', '').replace(',', '').strip()
    try:
        return float(val_clean)
    except Exception:
        return None

try:
    with zipfile.ZipFile(xlsx_path, 'r') as zip_ref:
        shared_strings = []
        if 'xl/sharedStrings.xml' in zip_ref.namelist():
            ss_content = zip_ref.read('xl/sharedStrings.xml')
            ss_root = ET.fromstring(ss_content)
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in ss_root.findall('ns:si', ns):
                t_elems = si.findall('.//ns:t', ns)
                val = "".join([t.text for t in t_elems if t.text is not None])
                shared_strings.append(val)
        
        target_sheet = 'xl/worksheets/sheet4.xml'
        if target_sheet in zip_ref.namelist():
            sheet_content = zip_ref.read(target_sheet)
            sheet_root = ET.fromstring(sheet_content)
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            
            rows = []
            for row in sheet_root.findall('.//ns:row', ns):
                row_cells = {}
                for cell in row.findall('ns:c', ns):
                    r_ref = cell.get('r')
                    col_letter = "".join([c for c in r_ref if not c.isdigit()])
                    
                    val_elem = cell.find('ns:v', ns)
                    cell_val = ""
                    if val_elem is not None:
                        val_str = val_elem.text
                        t_attr = cell.get('t')
                        if t_attr == 's' and val_str is not None:
                            idx = int(val_str)
                            if idx < len(shared_strings):
                                cell_val = shared_strings[idx]
                        else:
                            cell_val = val_str
                    row_cells[col_letter] = cell_val
                
                # Fetch columns A to W (23 columns)
                row_list = [row_cells.get(chr(c), "") for c in range(ord('A'), ord('W')+1)]
                if any(row_list):
                    rows.append(row_list)
            
            # Extract header and data
            header = rows[0]
            data_rows = rows[1:]
            
            events = []
            unique_venues = set()
            unique_sports = set()
            unique_zones = set()
            
            for r in data_rows:
                # Ensure the row has enough columns
                while len(r) < len(header):
                    r.append("")
                
                sport = r[2].strip()
                venue = r[3].strip()
                zone = r[4].strip()
                session_code = r[5].strip()
                date_serial = r[6].strip()
                games_day = r[7].strip()
                session_type = r[8].strip()
                description = r[9].strip()
                start_serial = r[10].strip()
                end_serial = r[11].strip()
                seat_chart = r[12].strip()
                
                # Ticket Prices using try_float
                prices = {
                    'A': try_float(r[13]),
                    'B': try_float(r[14]),
                    'C': try_float(r[15]),
                    'D': try_float(r[16]),
                    'E': try_float(r[17]),
                    'F': try_float(r[18]),
                    'G': try_float(r[19]),
                    'H': try_float(r[20]),
                    'I': try_float(r[21]),
                    'J': try_float(r[22])
                }
                
                # Filter out None values
                prices = {k: v for k, v in prices.items() if v is not None}
                
                date_str = excel_date_to_str(date_serial)
                start_str = excel_time_to_str(start_serial)
                end_str = excel_time_to_str(end_serial)
                
                unique_venues.add(venue)
                unique_sports.add(sport)
                unique_zones.add(zone)
                
                events.append({
                    'sport': sport,
                    'venue': venue,
                    'zone': zone,
                    'sessionCode': session_code,
                    'date': date_str,
                    'gamesDay': int(float(games_day)) if games_day and games_day != '-' else 0,
                    'sessionType': session_type,
                    'description': description,
                    'startTime': start_str,
                    'endTime': end_str,
                    'prices': prices,
                    'seatChart': seat_chart
                })
                
            print("Successfully processed spreadsheet data!")
            print(f"Total events parsed: {len(events)}")
            print(f"Unique sports ({len(unique_sports)}): {sorted(list(unique_sports))}")
            print(f"Unique zones ({len(unique_zones)}): {sorted(list(unique_zones))}")
            print(f"Unique venues ({len(unique_venues)}): {sorted(list(unique_venues))}")
            
            # Write to JSON file
            with open(json_output_path, 'w', encoding='utf-8') as jf:
                json.dump(events, jf, indent=2, ensure_ascii=False)
            print(f"JSON database written to {json_output_path}")

except Exception as e:
    import traceback
    traceback.print_exc()
