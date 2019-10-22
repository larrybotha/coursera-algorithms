import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;
import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
  Boolean[][] grid;

  // creates n-by-n grid, with all sites initially blocked
  public Percolation(int n) {
    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        grid[i][j] = false;
      }
    }
  }

  // opens the site (row, col) if it is not open already
  public void open(int row, int col) {
    grid[row][col] = true;
  }

  // is the site (row, col) open?
  public boolean isOpen(int row, int col) {
    return grid[row][col] == true;
  }

  // is the site (row, col) full?
  public boolean isFull(int row, int col) {
    return !this.isOpen(row, col);
  }

  // returns the number of open sites
  public int numberOfOpenSites() {
    int numOpen = 0;
    int numRows = grid.length;
    int numCols = grid[0].length;

    for (int i = 0; i < numRows; i++) {
      for (int j = 0; j < numCols; j++) {
        if (this.isOpen(i, j)) {
          numOpen++;
        }
      }
    }

    return numOpen;
  }

  // does the system percolate?
  public boolean percolates() {
    return false;
  }

  // test client (optional)
  public static void main(String[] args) {

  }
}
