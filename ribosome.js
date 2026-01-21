
// stage
var stage = acgraph.create('myDiv');
stage.resize(window.innerWidth*0.9, window.innerHeight*0.9);

// globals

// starting positions of first RNA
var x = window.innerWidth * 0.05;
var y = window.innerHeight * 0.5;

// box size
var box_size = x * 0.05

// padding between boxes
var padding = x * 0.01

var mRNAs = [];
var mRNADescs = [];
var mRNATexts = [];
var linePaths = [];
var codons = [];
var ligases = [];

// ribosome starting position
var ribosome_pos = 0;

var rect1 = new acgraph.math.Rect(x-5, y-70, 150, 60);
var rect2 = new acgraph.math.Rect(x-5, y-5, 150, 50);
var su1 = acgraph.vector.primitives.roundedRect(stage, rect1, 6);
var su2 = acgraph.vector.primitives.roundedRect(stage, rect2, 6);
su1.fill("#FFE2DE");
su2.fill("#FFE2DE");

// main
createSequence(document.getElementById("rnaInput").value);

function enterButtonClick() {
  reset();
  createSequence(document.getElementById("rnaInput").value);
}

function backwardButtonClick() {
  // reset();
  if (ribosome_pos > 0)
  {
    ribosome_pos -= 1;
    su1.setPosition(su1.getX()-150, su1.getY());
    su2.setPosition(su2.getX()-150, su2.getY());
  }
}

function forwardButtonClick() {
  // reset();
  if (ribosome_pos < codons.length-1)
  {
    ribosome_pos += 1;
    su1.setPosition(su1.getX()+150, su1.getY());
    su2.setPosition(su2.getX()+150, su2.getY());
  }
  
  if (ribosome_pos > 0 && (ligases.length > 0 || codons[ribosome_pos].join('') == "AUG"))
  {
    var ligase = stage.path();
    ligase.moveTo(su2.getX()+5, su2.getY()-10);
    ligase.lineTo(su2.getX()+5, su2.getY()-30);
    ligase.lineTo(su2.getX()+55, su2.getY()-30);
    ligase.lineTo(su2.getX()+55, su2.getY()-100);
    ligase.lineTo(su2.getX()+95, su2.getY()-100);
    ligase.lineTo(su2.getX()+95, su2.getY()-30);
    ligase.lineTo(su2.getX()+145, su2.getY()-30);
    ligase.lineTo(su2.getX()+145, su2.getY()-10);
    ligase.lineTo(su2.getX()+5, su2.getY()-10);
    ligase.fill("#BBBBBB");
    ligases.push(ligase);
  }
}

function createSequence(text)
{
  x_inc = x;
  for (let i = 0; i < text.length; i++)
  {
    var rectangle = acgraph.rect(x_inc, y, 40, 40);
    rectangle.parent(stage);
    rectangle.desc(text[i]);
    var mRNADesc = rectangle.desc();
    var mRNAText = stage.text(x_inc+5, y+5, mRNADesc, {fontSize: '15px'});
    rectangle.fill(RNAColorCode(text[i]));
    mRNAs.push(rectangle);
    mRNADescs.push(mRNADesc);
    mRNATexts.push(mRNAText);
    x_inc += 50;
    
    if ((i+1) >= 3 && (i+1)%3 == 0)
    {
      codons.push( [ text[i-2], text[i-1], text[i] ] );
      
      var linePath = stage.path();
      linePath.moveTo(x_inc-10, y+50);
      linePath.lineTo(x_inc-150, y+50);
      linePath.close();
      
      linePaths.push(linePath);
    }
  }
}

function reset()
{
  su1.setPosition(x-5, y-70);
  su2.setPosition(x-5, y-5);
  ribosome_pos = 0;
  mRNAs.forEach(item => item.remove());
  mRNATexts.forEach(item => item.remove());
  linePaths.forEach(item => item.remove());
  ligases.forEach(item => item.remove());
  
  mRNAs = [];
  mRNADescs = [];
  mRNATexts = [];
  codons = [];
  linePaths = [];
  ligases = [];
}

function RNAColorCode(rna)
{
  if (rna == 'A')
    return '#A5D6A7';
  if (rna == 'C')
    return '#D6A5A7';
  if (rna == 'G')
    return '#A5A7D6';
  if (rna == 'U')
    return '#D5D7A6';
}
