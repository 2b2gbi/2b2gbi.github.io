function testRunning(){
    alert("test");
    var feedLink = "http://devblog.ricky.me/rss.xml" /*window.prompt("Enter a RSS feed URL","www.website.com/rss"); */
    const url = feedLink;
    const textarea = document.getElementById("feedOutput");
    feednami.load(url)
        .then(feed => {
        textarea.value = ""
        console.log(feed)
        for (let entry of feed.entries){
            textarea.value += "${entry.title}\n${entry.link}\n\n"
        }
    })
}

testRunning();