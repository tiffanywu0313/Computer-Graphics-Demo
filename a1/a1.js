/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vsep2018
//  Assignment 1 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('Assignment 1 Tiffany');
console.log('3/0');
//console.log(a);
//var foo
//console.log(foo);

a=4;
b=5;
function go(){
  var a = 14; b = 15;
}
go();
console.log('a=',a,'b=',b);

a=5;
b=2.6;
console.log('a=',a,'b=',b);
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xaa8cc5);     // set background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////

light = new THREE.PointLight(0xffff00);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
var diffuseMaterial3 = new THREE.MeshLambertMaterial( {color: 0xffff00} );
var diffuseMaterial4 = new THREE.MeshLambertMaterial( {color: 0xff69b4} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffa500, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var armadilloMaterial = new THREE.MeshBasicMaterial( {color: 0x7fff7f} );

///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////
// WORLD COORDINATE FRAME
/////////////////////////////////////

var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////
// FLOOR with texture
/////////////////////////////////////

floorTexture = new THREE.TextureLoader().load('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial );
box.position.set(-4, 0, 0);
scene.add( box );

boxGeometry1 = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial3 );
box.position.set(-4, 1, 0);
box.rotation.set(0,90,0);     // rotation about x,y,z axes
scene.add( box );

boxGeometry2 = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial4 );
box.position.set(-4, 2, 0);
box.rotation.set(0,180,0);     // rotation about x,y,z axes
scene.add( box );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html]
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
  // Cube parameters: width (x), height (y), depth (z),
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
mcc = new THREE.Mesh( mccGeometry, cubeMaterialArray );
mcc.position.set(-2,0,0);
scene.add( mcc );

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
cylinder.position.set(2, 0, 0);
scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );

/////////////////////////////////////////////////////////////////////////
// torus 2
/////////////////////////////////////////////////////////////////////////
// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus2 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus2.position.set(4, 0, 0);   // translation
torus2.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus2 );

/////////////////////////////////////////////////////////////////////////
// torus chain
/////////////////////////////////////////////////////////////////////////
// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus3 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus3.position.set(8, 0, 0);   // translation
torus3.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus3 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus4 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus4.position.set(7.5, 0, 1.5);   // translation
torus4.rotation.set(0,Math.PI/2.5,0);     // rotation about x,y,z axes
scene.add( torus4 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus5 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus5.position.set(6.5, 0, 3);   // translation
torus5.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus5 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus6 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus6.position.set(5.5, 0, 4.5);   // translation
torus6.rotation.set(0,Math.PI/4,0);     // rotation about x,y,z axes
scene.add( torus6 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus7 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus7.position.set(4, 0, 5.5);   // translation
torus7.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus7 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus8 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus8.position.set(2.5, 0, 6);   // translation
torus8.rotation.set(0,Math.PI/9,0);     // rotation about x,y,z axes
scene.add( torus8 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus9 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus9.position.set(0.8, 0, 6.5);   // translation
torus9.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus9 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus8 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus8.position.set(-1, 0, 6);   // translation
torus8.rotation.set(0,-Math.PI/9,0);     // rotation about x,y,z axes
scene.add( torus8 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus9 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus9.position.set(-2.5, 0, 5.5);   // translation
torus9.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus9 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus8 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus8.position.set(-4, 0, 4.5);   // translation
torus8.rotation.set(0,-Math.PI/5,0);     // rotation about x,y,z axes
scene.add( torus8 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus9 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus9.position.set(-5.5, 0, 3.5);   // translation
torus9.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus9 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus8 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus8.position.set(-6, 0, 2);   // translation
torus8.rotation.set(0,-Math.PI/2.5,0);     // rotation about x,y,z axes
scene.add( torus8 );
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus9 = new THREE.Mesh( torusGeometry, diffuseMaterial);
torus9.position.set(-6.5, 0, 0.5);   // translation
torus9.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus9 );

/////////////////////////////////////
//  CUSTOM OBJECT
////////////////////////////////////

var geom = new THREE.Geometry();
var geom2 = new THREE.Geometry();
var geom3 = new THREE.Geometry();
var v0 = new THREE.Vector3(0,0,0);
var v1 = new THREE.Vector3(3,0,0);
var v2 = new THREE.Vector3(0,3,0);
var v3 = new THREE.Vector3(3,3,0);
var v4 = new THREE.Vector3(1.5,3,-3);
var v5 = new THREE.Vector3(1.5,0,-3);


geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);

geom2.vertices.push(v0);
geom2.vertices.push(v1);
geom2.vertices.push(v2);
geom2.vertices.push(v3);
geom2.vertices.push(v4);
geom2.vertices.push(v5);

geom3.vertices.push(v0);
geom3.vertices.push(v1);
geom3.vertices.push(v2);
geom3.vertices.push(v3);
geom3.vertices.push(v4);
geom3.vertices.push(v5);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom2.faces.push( new THREE.Face3( 1, 3, 4 ) );
geom2.faces.push( new THREE.Face3( 1, 5, 4 ) );
geom3.faces.push( new THREE.Face3( 0, 2, 4 ) );
geom3.faces.push( new THREE.Face3( 4, 5, 0 ) );
geom.computeFaceNormals();
geom2.computeFaceNormals();
geom3.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject2 = new THREE.Mesh( geom2, diffuseMaterial2 );
customObject3 = new THREE.Mesh( geom3, diffuseMaterial2 );
customObject.position.set(0, 0, -2);
customObject2.position.set(0, 0, -2);
customObject3.position.set(0, 0, -2);
scene.add(customObject);
scene.add(customObject2);
scene.add(customObject3);

/////////////////////////////////////////////////////////////////////////////////////
//  create armadillo material
/////////////////////////////////////////////////////////////////////////////////////

var armadilloMaterial = new THREE.ShaderMaterial( {
//	uniforms: uniforms,
        uniforms: { textureSampler: {type: 't', value: floorTexture}},
	vertexShader: document.getElementById( 'armadilloVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'armadilloFragmentShader' ).textContent
} );

//fragmentShader: document.getElementById( 'armadilloFragmentShader' ).textContent
var ctx = renderer.context;
ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {
	console.log( item, loaded, total );
};

var onProgress = function ( xhr ) {
	if ( xhr.lengthComputable ) {
		var percentComplete = xhr.loaded / xhr.total * 100;
		console.log( Math.round(percentComplete, 2) + '% downloaded' );
	}
};
var onError = function ( xhr ) {
};
var loader = new THREE.OBJLoader( manager );
loader.load( 'obj/armadillo.obj', function ( object ) {
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			child.material = armadilloMaterial;
		}
	} );
	scene.add( object );
}, onProgress, onError );

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) {
    console.log('W pressed');
    if (light.position.y<5){
      light.position.y += 0.1;
    }
  } else if (keyboard.pressed("S")){
    if (light.position.y>-5){
      light.position.y -= 0.1;
    }
  } else if (keyboard.pressed("A")){
    if (light.position.x>-5){
  light.position.x -= 0.1;
    }
  } else if (keyboard.pressed("D")){
    if (light.position.x<5){
  light.position.x += 0.1;
    }
  }
  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
  renderer.render(scene, camera);
}

update();
