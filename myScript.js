import { GLTFLoader } from '/js/three.js-master/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from '/js/three.js-master/examples/js/controls/OrbitControls.js';
var brainObject;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1500);
// var light = new THREE.AmbientLight( 0xFFFFFF, 1 ); // soft white light
// light.position.set(0, 10, 0);
// scene.add(light);

var light1 = new THREE.PointLight( 0xffffff, 2);
var light2 = new THREE.PointLight( 0xffffff, 2);
var light3 = new THREE.PointLight( 0xffffff, 2);
var light4 = new THREE.PointLight( 0xffffff, 2);
var light5 = new THREE.PointLight( 0xffffff, 2);
var light6 = new THREE.PointLight( 0xffffff, 2);

light1.position.set( 10, 0, 0 );
light2.position.set( -10, 0, 0 );
light3.position.set( 0, 10, 0 );
light4.position.set( 0, 0, 10 );
light5.position.set( 0, 0, -10 );
light6.position.set( 0, -20, 0 );

scene.add( light1, light2, light3, light4, light5, light6 );


var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xb3cfdd, 1);
document.body.appendChild( renderer.domElement );


var controls = new THREE.OrbitControls( camera, renderer.domElement );
camera.position.set( 5, 2, 0);
controls.update();
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

var dir1 = new THREE.Vector3( 1, 8, 10 );
var dir2 = new THREE.Vector3( 5, 10, 10 );
var dir3 = new THREE.Vector3(4, 25, 20);

//normalize the direction vector (convert to vector of length 1)
dir1.normalize();
dir2.normalize();
dir3.normalize();

var origin = new THREE.Vector3( 0, 0, 0 );
var length = 4;
var hex1 = 0xffff00;
var hex2 = 0xffffff;
var hex3 = 0x000000;

var arrowHelper1 = new THREE.ArrowHelper( dir1, origin, length, hex1 );
scene.add( arrowHelper1 );
var arrowHelper2 = new THREE.ArrowHelper(dir2, origin, 4, hex2 );
scene.add( arrowHelper2 );
var arrowHelper3 = new THREE.ArrowHelper(dir3, origin, length, hex3);
scene.add(arrowHelper3);

var loader = new GLTFLoader();
loader.load( '/human_brain/scene.gltf', function ( gltf ) {
	brainObject = gltf;
	scene.add( gltf.scene );
	console.log(scene);
	console.log(brainObject.scene)
}, undefined, function ( error ) {

	console.error( error );

} );

var curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);

var points = curve.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
var curveObject = new THREE.Line( geometry, material );
scene.add(curveObject);

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );


}
animate();