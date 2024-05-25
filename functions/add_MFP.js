export function addMFP (event){
    const tagMFP = ` <span class="badge badge-mfp" title="MFP">MFP</span>`;
    const location = event.target.parentElement;
    location.innerHTML += tagMFP;
}