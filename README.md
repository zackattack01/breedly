## Welcome to 
![breedly](./app/assets/images/logo_small.png)

## The what 
Breedly is a personal blog feed reading site for singles with blogs.

## The what specifically
Users can:

- [x] Sign up 
- [x] Sign in
- [x] Login as a guest
- [x] Provide a link to their own blog and add it to the database
- [x] Select topics they're interested in
- [x] See suggested feeds based on the topics they're interested in
- [x] Subscribe to another user's blog
- [x] Add public feeds to the database
- [x] Subscribe to any public blogs
- [x] See a random feed
- [x] Search for feeds by topic or title
- [x] Reorder their subscriptions by drag and drop

## Wireframes
[check em' out](./docs/views.md)

## The timeline

### User Auth, Schema

- User authentication and sessions
- HTML forms for sign in/up
- Create the feeds model

[Details](./docs/phase_one.md)

### User feeds and basic user show

- add basic json views for the feeds index and show
- associated Backbone feed logic
- add interest and topic models 
- seed with users and feeds
- add subscriptions model and associations
 
[Details](./docs/phase_two.md)

### Comparator for generating feeds

- User's will have a feed index that is generated according to their preferences
- This is done primarily on the back end (the filtering and sorting logic)

[Details](./docs/phase_three.md)

### Style points
- Random feed generator randomly selects a feed and redirects the user
- Drag and drop subscriptions to reorder them
- Autocomplete for search by topic and title
- Toggle subscribe/unsubscribe on any feed's show page or search result

### Plans for the future

- create about us, help, contact us pages
- Additional points may be given to the compatibility score if a user has indicated an interested in the user who is having the feeds generated
- Implement a cap on the number of feeds provided, allow a refresh button from backbone as well as a more feeds button
    - This will request the next 100 (or whatever the cap is) number of sorted feeds from the database
- Users can add a profile picture
- A private user messaging systems