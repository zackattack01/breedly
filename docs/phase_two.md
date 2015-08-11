# Feeds and Seeds

## Rails side
- jbuilder files for feeds index will be capped at current_user.feeds, this relationship will be custom made with the logic from phase III
- List just the owner id and urls in the index
- All feed info will be used on the feed show page

## Backbone
- I'll need a model and collection for feeds
- Views for both using templates

## Topics (of interest)
- Blog feeds will have_and_belong_to_many topics
    - Later users will be able to mark an interest in a topic

#### Topic Schema
- name
    - to be validated for inclusion in a set of topics
- feed_id -> foreign key

## Seeding
- This will be difficult, for testing I'll generate a bunch of random users and assign random feeds that I find
- Later I'll create a seed file more carefully