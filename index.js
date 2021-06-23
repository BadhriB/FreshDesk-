
let viewTUrl = `https://newaccount1624360051939.freshdesk.com/api/v2/contacts`;
let key = `hQoPeAvBlZ2jMIem3qml`;
let ticketUrl = 'https://newaccount1624360051939.freshdesk.com/api/v2/tickets';
loadTicket();
    function loadTicket(){
    fetch(viewTUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'BASIC ' + btoa(key)
        }
    }
    )
        .then((data) => data.json())
        .then((user) => {
            console.log(user);
            const allUsers = document.querySelector(".users");
            const TicketUser = document.querySelector(".ticket");
            user.forEach(element => {
                let req_id = element.id;
                fetch(ticketUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'BASIC ' + btoa(key)
                    }
                }
                )
                    .then((data) => data.json())
                    .then((user) => {
                        debugger
                        console.log(req_id);
                        let obj = user.find(a => a.requester_id === req_id);
                        console.log(obj);
                        const userConatiner = document.createElement("div");
                        userConatiner.className = "user-container";
                        userConatiner.innerHTML = `
        <p>Name : ${element.name}</p>
        <button class="name-edit" onclick="editName('${element.name}',${element.id})"> Edit name </button>
        <p>Subject: ${obj.subject}</p>
        <p>Priority: ${obj.priority}</p>
            <p>Email: ${element.email}</p>
            <p>Created at: ${element.created_at}</p>
            <p>Id: ${element.id}</p>
           
           
        `;
                        allUsers.append(userConatiner);

                    });

            });
        })

}

function editName(name,id){
    localStorage.setItem("Id",id);
    document.querySelector(".Edit-name").value=name;
}

function updateName(id){
   const updatedName= document.querySelector(".Edit-name").value;
    const reqId=localStorage.getItem("Id");
        fetch(`https://newaccount1624360051939.freshdesk.com/api/v2/contacts/${reqId}`, {
      method: "PUT",
      headers: {
        'Authorization': 'BASIC ' + btoa(key),
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        name: updatedName,
      })
    })
      .then((data) => data.json())
      .then((users)=> {
        location.reload();
         });
   
}








