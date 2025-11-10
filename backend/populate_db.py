from backend.database import db
from backend.models.course import Course, PcattCourse
from backend.models.pathway import Pathway
import pandas as pd
import json

# List of json file names containing course information
campusCourseJsonFiles = ['hawaiicc_courses.json', 
                    'hilo_courses.json', 
                    'honolulucc_courses.json', 
                    'kapiolani_courses.json',
                    'kauai_courses.json',
                    'leeward_courses.json',
                    'maui_courses.json',
                    'manoa_courses.json',
                    'maui_courses.json',
                    'west_oahu_courses.json']

campusCourseCsvFiles = ['windward_courses.csv']

pcattCourseFiles = ['pcatt_courses.json']

pathwayFiles = ['manoa_degree_pathways.json']

def populate():
  for filename in campusCourseJsonFiles:
    # Open files
    with open('backend/models/course-data/' + filename, 'r', encoding='utf-8') as file:
      courses = json.load(file)

      # Create Course entry for each course in json
      for course in courses:
        course = Course(
          course_prefix=course['course_prefix'],
          course_number=course['course_number'],
          course_title=course['course_title'],
          course_desc=course['course_desc'],
          num_units=course['num_units'],
          dept_name=course['dept_name'],
          inst_ipeds=course['inst_ipeds'],
          data=course['metadata']
        )
        db.session.add(course)
      db.session.commit()
  
  for filename in campusCourseCsvFiles:
    df = pd.read_csv('backend/models/course-data/' + filename)

    for _, row in df.iterrows():
      course = Course(
        course_prefix=row['course_prefix'],
        course_number=row['course_number'],
        course_title=row['course_title'],
        course_desc=row['course_desc'],
        num_units=row['num_units'],
        dept_name=row['dept_name'],
        inst_ipeds=row['inst_ipeds'],
        data=row['metadata']
      )
      db.session.add(course)
    db.session.commit()

if __name__ == "__main__":
  populate()
  print("Database successfully populated with courses.")