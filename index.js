const baseUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTB-ET-WEB-PT/events"

let events = []

const root = document.querySelector("#root")

async function getEvents (){
    try{
    const res = await fetch(baseUrl)
    const response = await res.json()
    events = response.data
    render()
    } catch (error){
      console.error("Error when fetching events", error)
    }
  }

  getEvents()
  
  function render (){
    root.innerHTML = ""

    events.forEach((event) => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
        <h1>${event.name} </h1>
        <p> Date & Time: ${event.date}</p>
        <p> Description: ${event.description}</p>
        <p> Location: ${event.location}</p>  
        <button class = deleteButton data-id="${event.id}"> Delete Event </button>    
        `
        root.append(card)
    })

    document.querySelectorAll(".deleteButton").forEach((button) => {
        button.addEventListener("click", (e) => {
            removeEvent(e.target.getAttribute("data-id"))
        });
    })

    const eventForm = document.createElement("form")
    eventForm.classList.add("card")
    eventForm.innerHTML = `
    <h1> Create Event </h1>
    <input type="text" id="eventName" placeholder="Event Name" required />
    <input type="text" id="eventDescription" placeholder="Description" required />
    <input type="datetime-local" id="eventDate" required />
    <input type="text" id="eventLocation" placeholder="Location" required /> <br>
    <button type="submit">Create Event</button>`

    root.append(eventForm)

    eventForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const eventData = {
        name: document.querySelector("#eventName").value,
        description: document.querySelector("#eventDescription").value,
        date: `${document.querySelector("#eventDate").value}:00Z`,
        location: document.querySelector("#eventLocation").value,
      }

      await createEvent(eventData)
      eventForm.reset()

    })
  
  }

  async function removeEvent(eventId){
    try{
      await fetch(`${baseUrl}/${eventId}`,{
        method: "DELETE",
      })
      console.log("Event deleted")

      await getEvents()

    } catch (error){
      console.error(error)
    }
  }

  async function createEvent(newEventInfo){
    console.log(newEventInfo)
    try {
      const response = await fetch (baseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newEventInfo)
      })
const result = await response.json()
console.log(result)
      await getEvents()

    } catch (error){
      console.error(error)
    }
  }
  



  