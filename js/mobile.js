console.log('js connected')

  const searchMobile = async()=>{
   
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // toggleSpinner('block');
    // toggleSearchResults('none');
    searchMobileDetails(searchText);
    
   
    document.getElementById('search-field').value='';
    // console.log(searchField);
   

}
// spineer

const toggleSpinner =(displayStyle)=>{
  document.getElementById('spineer').style.display = displayStyle;
  }
  const toggleSearchResults =(displayStyle)=>{
  document.getElementById('mobile-result').style.display = displayStyle;
  }

  // data fetch

  const searchMobileDetails =(searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
    `;
     fetch(url)
     .then(res =>  res.json())
     .then(data => showMobile(data.data));

    
 
  }

searchMobileDetails("Apple");

const showMobile =(mobile)=>{
  // console.log(mobile);
  const mobileResult = document.getElementById('mobile-result');

  mobileResult.innerHTML='';
  mobile.forEach(mobiles =>{
    console.log(mobiles);

    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML=`<div class="card h-100">
    <img src="${mobiles.image}" class=" w-75 h-75  card-img-top img-fluid" alt="...">
    <div class="card-body">
      
      <h5 class="card-title">${mobiles.phone_name}</h5>
      <h5 class="card-title">${mobiles.brand}</h5>
     
    </div>
    <div class="text-center text-success">
    <button onclick="loadMobileDetail('${mobiles.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
    </div>
    `;
    mobileResult.appendChild(div);

    // toggleSpinner('none');
    // toggleSearchResults('block');
    
  });

}



const loadMobileDetail = id =>{
  console.log('button is ok boss')
  console.log(id);

  const url =`https://openapi.programming-hero.com/api/phone/${id}`;

  fetch(url)
  .then(res => res.json())
  .then(data =>loadMobileDetailDisplay(data.data));
}

const loadMobileDetailDisplay =(details)=>{
  console.log(details);
  const modalTitle = document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText = details.name;

  const mobileDetails = document.getElementById('mobile-details');
  mobileDetails.innerHTML='';
 

    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML=`
    <img src="${details.image}" class="w-50 h-50 card-img-top img-fluid" alt=".....">
  
    <div class="card-body">
    <p>Release Date: ${details.releaseDate ? details.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${details.mainFeatures ? details.mainFeatures.storage : 'No Storage Information '}</p>
    <p>Display: ${details.mainFeatures ? details.mainFeatures.displaySize : 'No Display Information '}</p>
    <p>Sensor: ${details.mainFeatures.sensors ? details.mainFeatures.sensors[0] : 'no sensor'}</p>
    <p>Others: ${details.others ? details.others.Bluetooth : 'No Bluetooth Information'}</p>
    </div>
    `;
    mobileDetails.appendChild(div);
}

