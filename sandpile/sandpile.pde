int[][] sandpiles;

void setup(){
  size(600, 600);
  background(0, 0, 255);
  sandpiles = new int[width][height];
  sandpiles[0][height-1] = 1000000;
  sandpiles[width-1][height-1] = 100000;
  sandpiles[width-1][0] = 100000;
  sandpiles[0][0] = 100000;
}

void topple() {
  int[][] nextpiles = new int[width][height];  

  for(int x = 0; x < width; x++) {
    for(int y = 0; y < height; y++) {
      int num = sandpiles[x][y];
      if(num > 3) {
        nextpiles[x][y] += (num - 4);
        if (x+1 < width)
          nextpiles[x+1][y]++;
        if (x-1 >= 0)
          nextpiles[x-1][y]++;
        if (y+1 < height) 
          nextpiles[x][y+1]++;
        if (y-1 >= 0) 
          nextpiles[x][y-1]++;
      } else {
        nextpiles[x][y] += sandpiles[x][y];
      }
    }
  }
  sandpiles = nextpiles;
}

void render() {
  loadPixels();
   for(int x = 0; x < width; x++){
     for(int y = 0; y < height; y++) {
       color col = color(0, 0, 0);
       int num = sandpiles[x][y];
       if(num == 0){
         col = color(0, 0, 255);
       } else if(num == 1) {
         col = color(111, 213, 226);
       } else if(num == 2) {
         col = color(252, 241, 27);
       } else if(num == 3) {
         col = color(104, 47, 28);
       }
       
       pixels[x + y * width] = col;
     }
   }
  //pixel
}

void draw() {
  render();
  topple();
  updatePixels();
}
