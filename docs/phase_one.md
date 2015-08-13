# Auth and Forms

## Models

### Users
- `password_digest`
- `session_token`
- `username` -> unique
- `real_name` -> not necessarily unique
- `age`
- `age_range`
    - distance from the user's own age allowed when calculating compatible feeds
- `have_one` feed
- `have_many` interests

### Feeds
- `user_id` -> foreign key
- `title` -> optional
- `url`
- `have_one` (or maybe many) topic(s)

## Controllers

### Users need:
- new, the only one that won't be api namespaced
    - begin backbone immediately after auth
- update
- create
- destroy
- show
- maybe an index for admin

### Sessions need:
- new
- create
- destroy

### Feeds need:
- new
- create
- destroy
- update
- show
- index

## Views

### Needed:
- user's new
    - this will take just a username and password
    - on success will fire off backbone home (users show), and this will provide a way for the user to update settings with interests, age, etc. 
- session new (shares a partial with users new)
- ejs templates for
    - user's show 
    - user's edit
- feed views to come 