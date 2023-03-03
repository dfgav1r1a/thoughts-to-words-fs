# Thoughts to words (full-stack app)

> Daniel Gaviria:
>> [LinkedIn](https://www.linkedin.com/in/daniel-gaviria-dev/)
>> [Bio](https://www.danielgaviria.net/artist/daniel-gaviria/)
>> [YouTube](https://www.youtube.com/@gavirialive)

> This solution could be accessed/used here: 

This is full stack application developed using the following frameworks and databases:

NodeJS
ExpressJS
Bootstrap (for responsiveness)
MongoDB

### App Architecture and tooling

ExpressJS offered the tooling and dependencies necessary to be able to build the solution to create a blog app with CRUD capabilities, by using the express application generator. Upon installation the skeleton of the project was predifined and ready to be used and populated with the logic to implement an API that would link the three tiers.

The express application generator integrates PUG as the  templating engine to render HTML in the server side. REACT could have handled the rendering of the document on the client side for a faster load of the HTML document and therefore for a possible better user experience but PUG, for the time being, proved to be enough to render the components for this solution and, since PUG was already integrated in the project (and its uncanny ressembalnce to HTML code) it seemed to help with the speed during the development stage. 

### DB

MongoDB is a good decision for the database, if the use of the application were to grow, scalabitlity would be a concern that could be handled by the flexibility of this NoSQL database though it will require constant monitoring to make sure data is organized and categorized. The logic to read and persist data into the DB was done using MongooseJS which acts as a front end to MongoDB. It is good  practice to have a data abstraction layer that will store all the database related code for easier refactoring when/if a new DB restructuring is needed for the app. Though I did not specifically created a DAL, the application has a directory dedicated to all route handlers that handles all DB related code which is somewhat similar to having a DAL.

### UI/UX

As for the UI, I decided it to be an SPA mimiquing the likes of Wordpress dashboard UI. Though this solution is not as elegant as that of Worpress, using an SPA could mean a faster load of the document and a simplified UX. I tried to create a calm environment with soft colors and a familiar layout.

I intended this to be almost a non scrollable application but that turned out to be a difficult task to achieve giving the content that I intended to display on each page. If I had more time to develop this solution I would implement pagination in the All posts page instead of relying on the appeareance scroll bar when the container is overflow by its content.

## if (!deadline) { ... }

Several features shoud be implemented if this were to be released to the public:

1. Implementation of authentication and authorization: This app does shows every single post of every potential user. Implementing this feature would help with content management, personalization and security. This feature would also allow the implementation of control over the content that the user wants to make public or keep private.  

2. Implement the addition of media to the posts.

3. I would rethink the way the posts are displayed after creation, the way it is right now, could start to be limiting for the UX. Something that would help greatly is the implementation of searching content on both the private dashboard (when created) and the public page.

4. The app does use CDN's for the for Bootstrap components. This should be changed  and integrated in the logic to improve component availability and UI loading times.

### Notes

- No unit testing was used during the development of the solution.
- The styles in this solution were a combination of custom styles and Bootstrap.



