//function next_pg(){
    //width: 126px;
    //height: 135px;
    //margin-right: 10px;
//}
var isListView = true;

function toggleTextAlignment(elements, alignment) {
    elements.forEach(function(element) {
        element.style.textAlign = alignment;
    });
}

function toggleImageSize(images, width, height) {
    images.forEach(function(image) {
        image.style.width = width;
        image.style.height = height;
    });
}

function toggleView() {
    var text_alignElements_h2 = document.querySelectorAll('h2');
    var text_mid_p = document.querySelectorAll('p');
    var card_images = document.querySelectorAll('.card img');
    var mainElement = document.getElementById('main');

    if (isListView) {
        mainElement.classList.remove('list');
        mainElement.classList.add('grid');
        toggleTextAlignment(text_alignElements_h2, 'center');
        toggleTextAlignment(text_mid_p, 'center');
        toggleImageSize(card_images, '126px', '135px');
    } else {
        mainElement.classList.remove('grid');
        mainElement.classList.add('list');
        toggleTextAlignment(text_alignElements_h2, 'left');
        toggleTextAlignment(text_mid_p, 'left');
        toggleImageSize(card_images, '90px', '90px');
    }

    isListView = !isListView;
}