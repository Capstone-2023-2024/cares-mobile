# Changelog:

2023/11/20

- Image Carousel for Calendar of Activities in dashboard
- Fixed the heading of chats

# Developer Note:

- Caches the student info inside its local storage via CURRENT_STUDENT_KEY and removed when signing out.

- Register screen -> convert octet-stream to pdf in Android API 24
- Announcement needs to have a clear section between Calendar of Activities
- Adviser need to setup section in user context
- Name RegEx can be changed to: /^[A-Z]_(\ [A-Z]+)_, [^0-9]+/ for detecting names without Middle Initials, but it will also include '.' with CORs with '.'
