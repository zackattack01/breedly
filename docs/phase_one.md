# Auth and Forms

## Models

### Users
- `password_digest`
- `session_token`
- `username` -> unique
- `real_name` -> not necessarily unique
- `age`
- `have_many` feed
- `have_many` interests

### Feeds
- `user_id` -> foreign key
- `title` -> optional initially but will default to URL if none can be found when the feed is fetched
- `url`
- `have_many` feed_topic

## Controllers

### Users need:
- new
- create
    - begin api namespace/backbone logic immediately after auth
- update
- destroy
- show

### Sessions need:
- new
- create
- destroy

### Feeds need:
- new
- create
- destroy
- show
- index

## Views

### Needed:
- user's new
    - this will take just a username and password
    - on success will fire off backbone home (users show), and this will provide a way for the user to update settings with interests, age, etc. 
- session new (shares a partial with users new)
- ejs templates for
    - user's show- this will be the top level composite view
    - user's edit
- feed views to come 