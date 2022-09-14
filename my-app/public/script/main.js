fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        let keys = Object.keys(data.posts_by_date).reverse()
        let posts = data.posts_by_date

        function sortByDateTemplate(d){
            return `
                <div class="sort-by-date">
                    <span class="post-date">
                        ${new Date(d).toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'})}
                        
                    </span>
                    <div class="post-list">
                        ${posts[d].map(postTemplate).join(" ")}
                    </div>
                </div>
            `
        }

        function postTemplate(p){
            var json_date = new Date(p.published_at)
            var date = json_date.toLocaleDateString('en-GB', {day : 'numeric', month : 'long', year : 'numeric'}) + " - " 
                     + json_date.toLocaleTimeString('en-GB', {hour: 'numeric', minute: 'numeric'})
            return `
                <div class="post">
                    <div class="social-media" style="${statusTemplate(p)}">
                        <img class="social-media-img" src="${socialMediaTemplate(p)}">
                    </div>
                        <div class="post-inside">
                            <span style="padding-left: 0; font-size: 14px; font-weight: lighter">
                                ${date}

                                            
                                <span class="sagust">
                                
                                    <a href="#" class="options"  style="float: right"  >
                                    
                                    
                                        <img src="project png/options.png" >
                                    </a>
                                    <a href="#" class="delete" style="float: right" > 
                                     
                                        <img src="project png/delete.png" >
                                        
                                    </a>
                                    
                                     
                                </span>
                            </span>
                            <br/>
                            <p>
                                ${p.entry.message.includes("http") ? postTextTemplate(p) : p.entry.message}
                            </p>
                            <img class="post-photo" src="${p.entry.image[0]}" 
                                onerror="if (this.src != 'project png/no-post-image.png') 
                                this.src = 'project png/no-post-image.png';" alt="post-media">
                            <span class="statistic">
                                <a href="#" class="likes">


                                
                                <img src="project png/likes.png">
                                <span id="likes">0</span>
                                </a>
                                <a href="#"  class="comments">
                                
                                <img src="project png/comments.png">
                                <span id="comments">0</span>  
                                </a>
                                <a href="#" class="shares">
                                 
                                    <img src="project png/shares.png">
                                    <span id="shares">0</span> 
                                </a>
                                <a href="#" class="views">
                                
                                 
                                    <img src="project png/views.png">
                                    <span id="views">0</span> 
                                </a>
                                </span>
                        </div>
                </div>
            `
        }

        function postTextTemplate(p){
            return `
                ${p.entry.message.substr(0,p.entry.message.indexOf("http"))}
                <a href="${p.entry.message.substr(p.entry.message.indexOf("http"))}">
                    ${p.entry.message.substr(p.entry.message.indexOf("http"))}
                </a>
            `
        }

        function socialMediaTemplate(p){
            if(p.account.channel=="facebook")
                return "project png/facebook.png"
            else if(p.account.channel=="twitter")
                return "project png/twitter.png"
            else if(p.account.channel=="instagrambusiness")
                return "project png/instagram.png"
            else
                return ""
        }

        function statusTemplate(p){
            switch(p.status){
                case 0:
                    return "background-color: #f7bf38"
                case 1:
                    return "background-color: #3ac183"
                case 2:
                    return "background-color: #67b1f2"
                case 3:
                    return "background-color: #acacac"
                case 4:
                    return "background-color: #fb6450"
                default:
                    return "background-color: #444444"
            }
        }

        document.getElementById("app").innerHTML = `
                ${keys.map(sortByDateTemplate).join(" ")}
        `  
    })
    .catch(function(error){
        console.error(error);
    });
