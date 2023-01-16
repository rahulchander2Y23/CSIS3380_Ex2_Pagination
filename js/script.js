// Name: Rahul Chander
// Course: CSIS3380
// Exercise 2 - Javascript
// Date: Jan 15, 2023

const ITEMS_PER_PAGE = 10

const all_contacts = users
var contact_list_container = document.getElementsByClassName("contact-list")[0]
var page_numbers = document.getElementById("page_numbers")
const num_pages = Math.ceil(all_contacts.length/ITEMS_PER_PAGE)
var total_contacts = document.getElementById("total_contacts")

function initialize()
{
    // update total number of contacts
    total_contacts.innerHTML = `Total: ${all_contacts.length}`

    // create list item for each contact    
    for(i=0;i<all_contacts.length;i++)
    {
        contact_item = document.createElement('li')
        contact_item.classList.toggle("contact-item")
        contact_item.classList.toggle("cf")
        
        email_str = (all_contacts[i]["name"]).replace(/\s/g,".")+"@example.com" //replace all whitespace to '.' in email.
        contact_item.innerHTML = `<div class="contact-details">`+
                        `<img class="avatar" src=${all_contacts[i]["image"]}>`+
                        `<h3>${all_contacts[i]["name"]}</h3>`+
                        `<span class="email">${email_str}</span>`+
                    `</div><div class="joined-details">`+
                    `       <span class="date">Joined ${all_contacts[i]["joined"]}</span></div>`
        contact_item.style.display = "none"
        contact_list_container.appendChild(contact_item)
    }

    // create page numbers in pagination
    for(i=0;i<num_pages;i++)
    {
        page_number_item = document.createElement('li')
        if(i==0)
            page_number_item.innerHTML = `<a class="active_page page_number" href=#contacts_heading onclick=load_page(${i+1})>${i+1}</a>`
        else
            page_number_item.innerHTML = `<a class="page_number" href=#contacts_heading onclick=load_page(${i+1})>${i+1}</a>`
        page_numbers.appendChild(page_number_item)
    }
    // start at page#1
    load_page(1)
}

// function to display contacts from start# and end#
function display_contact(start_id, end_id)
{
    contact_items = contact_list_container.getElementsByTagName('li')
    for(i=0;i<all_contacts.length;i++)
        if(i>=start_id && i<end_id)
            contact_items[i].style.display = "block"
        else
            contact_items[i].style.display = "none"
    
}

// function to display contacts from a given page
function load_page(some_num)
{
    prev_page_item = document.getElementsByClassName('active_page')[0]
    prev_page_item.classList.toggle('active_page')
      
    curr_page_item = document.getElementsByClassName('page_number')[some_num-1]
    curr_page_item.classList.toggle('active_page')

    start_id = (some_num-1)*ITEMS_PER_PAGE
    end_id = Math.min(some_num*ITEMS_PER_PAGE,all_contacts.length)
    display_contact(start_id, end_id)
}

initialize()