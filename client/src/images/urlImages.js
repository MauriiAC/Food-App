// function importAll(r) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const images = importAll(require.context('./newRecipes', false, /\.(gif|jpe?g|svg)$/));

// export default images;

// console.log(images);

// alert(images);





// import images from './newRecipes';

// let imgFile = {}

// // export default {
// //    testImage,
// // }


// const reqJpgs = require.context('./newRecipes', true, /\.jpg$/)
// const paths = reqJpgs.keys()

// // alert(paths)

// // ./testImage.jpg


// paths.map(elem => {
//     imgFile[elem.substring(2, elem.length-4)] = elem.substring(2, elem.length-4)
// })