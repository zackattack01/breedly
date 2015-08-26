# Comparator

## In the user model
- User `has_many` topic_interests, and `has_many` topics through topic_interests
- User then `has_many` feed_topics through topics, and `has_many` feeds through feed_topics. 
- User instance method `sorted_feeds` will sort the user's `feeds` by the grouped number of interests that they have in common.

## In the feed controller index
- The `@feeds` provided to the jbuilder template will be the `current_user.sorted_feeds` 
- The sorted feed collection will be served up to the backbone feeds collection