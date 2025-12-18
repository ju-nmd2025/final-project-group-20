function drawPlayer(player) {
  push();
  translate(player.x, player.y);

  // Flip if moving left
  if (player.velocityX < 0) scale(-1, 1);

  noStroke();

  //SHIRT & BODY 
  for (let i = 0; i < 5; i++) {
    fill(250 - i * 8);
    arc(0, 25 + i * 2, 42 - i, 35, PI, 0);
  }

  fill(250);
  rect(-21, 25, 42, 18);

  fill(230);
  triangle(-12, 15, 12, 15, 0, 30);

  stroke(180);
  strokeWeight(1.5);
  line(-12, 15, 0, 30);
  line(12, 15, 0, 30);

  noStroke();
  fill(200);
  ellipse(0, 33, 3, 3);
  ellipse(0, 38, 3, 3);

  fill(240);
  ellipse(-8, 28, 8, 3);
  ellipse(8, 28, 8, 3);

  // --- 2. NECK ---
  fill(255, 218, 185);
  rect(-8, 8, 16, 14);

  fill(234, 192, 134, 80);
  ellipse(0, 20, 14, 4);

  // --- 3. HEAD & FACE ---
  fill(234, 192, 134, 50);
  ellipse(0, 22, 24, 8);

  fill(255, 218, 185);
  beginShape();
  vertex(-20, -12);
  vertex(20, -12);
  vertex(21, 8);
  vertex(13, 24);
  vertex(0, 27);
  vertex(-13, 24);
  vertex(-21, 8);
  endShape(CLOSE);

  // Ears
  fill(255, 218, 185);
  ellipse(-22, 5, 10, 13);
  ellipse(22, 5, 10, 13);
  fill(234, 192, 134);
  ellipse(-22, 5, 5, 6);
  ellipse(22, 5, 5, 6);

  // --- 4. FACIAL FEATURES ---
  fill(234, 192, 134);
  ellipse(0, 12, 7, 4);
  ellipse(-2, 14, 2, 2);
  ellipse(2, 14, 2, 2);

  stroke(214, 172, 114);
  strokeWeight(2);
  noFill();
  if (player.velocityY < -5) {
    arc(0, 20, 10, 6, 0, PI);
  } else {
    line(-5, 20, 5, 20);
  }
  noStroke();

  // --- 5. GLASSES ---
  fill(255, 255, 255, 120);
  ellipse(-13, 3, 8, 6);
  ellipse(13, 3, 8, 6);

  noFill();
  stroke(40);
  strokeWeight(2.5);

  beginShape();
  vertex(-18, 0);
  vertex(-8, 0);
  vertex(-6, 6);
  vertex(-9, 12);
  vertex(-17, 12);
  vertex(-20, 6);
  endShape(CLOSE);

  beginShape();
  vertex(8, 0);
  vertex(18, 0);
  vertex(20, 6);
  vertex(17, 12);
  vertex(9, 12);
  vertex(6, 6);
  endShape(CLOSE);

  line(-6, 5, 6, 5);
  line(-20, 4, -24, 6);
  line(20, 4, 24, 6);

  // Eyes blink
  noStroke();
  fill(20);
  const blinkTimer = frameCount % 180;
  if (blinkTimer < 5) {
    rect(-14, 5, 4, 1);
    rect(10, 5, 4, 1);
  } else {
    ellipse(-12, 5, 4, 4);
    ellipse(12, 5, 4, 4);
    fill(255);
    ellipse(-11, 4, 1, 1);
    ellipse(13, 4, 1, 1);
  }

  // HAIR
  fill(15);
  arc(0, -6, 56, 54, PI, 0);

  fill(25);
  arc(0, -5, 52, 50, PI, 0);

  fill(30);
  beginShape();
  vertex(-27, -5);
  vertex(-23, 14);
  vertex(-20, -3);
  vertex(-14, 12);
  vertex(-8, 2);
  vertex(-2, 14);
  vertex(2, 0);
  vertex(8, 14);
  vertex(14, 2);
  vertex(20, 12);
  vertex(23, -3);
  vertex(27, 14);
  vertex(24, -26);
  vertex(12, -32);
  vertex(0, -34);
  vertex(-12, -32);
  vertex(-24, -26);
  endShape(CLOSE);

  stroke(20);
  strokeWeight(2);
  noFill();
  bezier(-22, -28, -25, -20, -20, -12, -18, -5);
  bezier(-15, -30, -18, -22, -14, -14, -10, -5);
  bezier(22, -28, 25, -20, 20, -12, 18, -5);
  bezier(15, -30, 18, -22, 14, -14, 10, -5);
  bezier(-5, -34, -3, -30, 3, -30, 5, -34);

  strokeWeight(1);
  line(-26, -20, -28, -24);
  line(26, -20, 28, -24);
  line(0, -34, -2, -38);
  line(2, -34, 4, -38);

  pop();
}
