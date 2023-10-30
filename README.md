# Student Caches

- 1x2 Prompt of intial value
- 14x2 Prompt of fetched values in Async Storage/Firestore

# Register screen

- convert octet-stream to pdf in Android API 24

# Added

2023/10/30

- Renders two options for mayors which are the Student Concerns & Personal Concern of the mayor. Complaints/concerns sent by mayors will be redirected to BM

# Fixed

- Choosing another google account is now available

# Known bugs

- Logging in with different email other than bulsu.edu.ph domain causes a temporary login, this is due to the email of the user is only retrieve when logging in, the current workaround is sharing a protected and non-protected component, however it is not working as expected
- features from choosing section needs to be reload for the validation to work
- uploading COR in registration before a email causes the app the need to be reloaded for it to upload the same file, can also choose different COR then rechoose again the target COR. PARTIAL_FIX
