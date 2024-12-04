import requests
from bs4 import BeautifulSoup
import json

term_code = '202501'

def parse_schedule(schedule_str):
    schedule_str = schedule_str.replace('Class:', '').replace('Exam:', '').strip()

    parts = schedule_str.split('--')

    days = parts[0].split(':')[1].strip() if ':' in parts[0] else parts[0].strip()
    times = parts[1].strip().split(' - ') if len(parts) > 1 else ['', '']
    location = parts[2].strip() if len(parts) > 2 else ''

    return {
        'days': ' '.join(days.split()),
        'startTime': times[0],
        'endTime': times[1] if len(times) > 1 else '',
        'location': location
    }

url = 'https://gulfline.fgcu.edu/pls/fgpo/szkschd.p_showresult'
data = {
    'Termcode': term_code,
    'Sess': '',
    'Campcode': '',
    'CollegeCode': '',
    'Deptcode': '',
    'Status': '',
    'Level': '',
    'CRN': '',
    'Subjcode': '',
    'CourseNumber': '',
    'CourseTitle': '',
    'CreditHours': '',
    'courseattribute': '',
    'BeginTime': '',
    'Instructor': '',
    'sortby': 'course',
    'Button1': 'Search'
}
print(f"Getting courses for term code {term_code}")
response = requests.post(url, data=data)
    
if response.status_code != 200:
    print(f"Failed to get courses for term code {term_code}")
    exit()

soup = BeautifulSoup(response.text, 'html.parser')

table = soup.find('table', id='Table4')

if table:
    output_file_path = "schedule_data.json"
    data_list = []

    rows = table.find_all('tr')[1:]
    for row in rows:
        cells = row.find_all('td')
        if len(cells) >= 12:
            status = cells[0].text.strip()
            capacity = cells[1].text.strip()
            seats_taken = cells[2].text.strip()
            seats_remaining = cells[3].text.strip()
            crn = cells[4].find('a').text.strip() if cells[4].find('a') else "N/A"
            course_code = cells[5].text.strip()
            course_name = cells[6].text.strip()
            credits = cells[7].text.strip()

            class_exam_info = cells[9].find_all('font')

            class_info = parse_schedule(class_exam_info[0].text.strip()) if len(class_exam_info) > 0 else {}

            exam_info = parse_schedule(class_exam_info[1].text.strip()) if len(class_exam_info) > 1 else {}

            instructor = cells[10].text.strip()
            term_length = cells[11].text.strip()

            course_data = {
                "status": status,
                "capacity": capacity,
                "seats_taken": seats_taken,
                "seats_remaining": seats_remaining,
                "crn": crn,
                "course_code": course_code,
                "course_name": course_name,
                "credits": credits,
                "class_info": class_info,
                "exam_info": exam_info,
                "instructor": instructor,
                "term_length": term_length
            }
            data_list.append(course_data)

    # Save the data as a JSON file
    with open(output_file_path, mode="w", encoding="utf-8") as json_file:
        json.dump(data_list, json_file, indent=2)

    print(f"Data successfully saved to {output_file_path}")
else:
    print("Table not found in the HTML file.")
