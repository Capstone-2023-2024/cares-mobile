# Changelog:

2023/11/05

- Content Context is split into Announcement Context and User Context
- User Provider will now handle the student info instead of individual screens and components processing the student info separately eg. Home, User Info, Hero

2023/10/30

- Renders two options for mayors which are the Student Concerns & Personal Concern of the mayor. Complaints/concerns sent by mayors will be redirected to BM
- Choosing another google account is now available

# Developer Note:

- Caches the student info inside its local storage via CURRENT_STUDENT_KEY and removed when signing out.

- Register screen -> convert octet-stream to pdf in Android API 24
- Announcement needs to have a clear section between Calendar of Activities
- Adviser need to setup section in user context
- Name RegEx can be changed to: /^[A-Z]_(\ [A-Z]+)_, [^0-9]+/ for detecting names without Middle Initials, but it will also include '.' with CORs with '.'
