# Comparator

## In the user model
- User instance method generate_sorted_feeds will sort the feeds in the database
- Each feed from the db will be given a score based on its compatibility with the current user
- Points will be given based on age, interests in common, etc.
[Scoring specifics](./comparator.md)

## In the feed controller index
- The @feeds provided to the jbuilder template will be the current_user.generate_sorted_feeds 
- The sorted feed collection will be served up to the backbone feeds collection