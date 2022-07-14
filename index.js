const p5f = p => {
    let cellSize = 4; // 4*4 - width*height
    let cellsPerRow = 200;
    let cellsPerColumn = 100;
    let cellsGrid = [];
    let oldCellsGrid = [];

    p.setup = function () {
        p.createCanvas(cellSize * cellsPerRow, cellSize * cellsPerColumn);

        p.frameRate(10);

        // Create grid cells
        for (let y = 0; y < cellsPerColumn; y++) {
            let row = [];
            for (let x = 0; x < cellsPerRow; x++) {
                row.push(Math.round(Math.random()));
            }
            cellsGrid.push(row);
        }
    }

    p.draw = function () {
        // Compute
        oldCellsGrid = JSON.parse(JSON.stringify(cellsGrid));

        let setCell = (x, y, cellsAlive) => {
            if (oldCellsGrid[y][x]) { // Cell alive
                if (cellsAlive !== 2 && cellsAlive !== 3) {
                    cellsGrid[y][x] = 0;
                }
            } else { // Cell dead
                if (cellsAlive === 3) {
                    cellsGrid[y][x] = 1;
                }
            }
        }

        {
            // All grid, implies testing x and y at every loop
            // for (let y = 0; y < cellsPerColumn; y++) {
            //     for (let x = 0; x < cellsPerRow; x++) {
            //         let cellsAlive = 0;
            //         cellsAlive += y > 0 && x > 0 && oldCellsGrid[y - 1][x - 1] ? 1 : 0;
            //         cellsAlive += y > 0 && oldCellsGrid[y - 1][x] ? 1 : 0;
            //         cellsAlive += y > 0 && x < cellsPerRow - 1 && oldCellsGrid[y - 1][x + 1] ? 1 : 0;
            //         cellsAlive += x > 0 && oldCellsGrid[y][x - 1] ? 1 : 0;
            //         // cellsAlive += oldCellsGrid[y][x] ? 1 : 0; // Current cell
            //         cellsAlive += x < cellsPerRow - 1 && oldCellsGrid[y][x + 1] ? 1 : 0;
            //         cellsAlive += y < cellsPerColumn - 1 && x > 0 && oldCellsGrid[y + 1][x - 1] ? 1 : 0;
            //         cellsAlive += y < cellsPerColumn - 1 && oldCellsGrid[y + 1][x] ? 1 : 0;
            //         cellsAlive += y < cellsPerColumn - 1 && x < cellsPerRow - 1 && oldCellsGrid[y + 1][x + 1] ? 1 : 0;
            //
            //         setCell(x, y, cellsAlive);
            //     }
            // }
        }

        {
            // Inner grid
            for (let y = 1; y < cellsPerColumn - 1; y++) {
                for (let x = 1; x < cellsPerRow - 1; x++) {
                    let cellsAlive = 0;
                    cellsAlive += oldCellsGrid[y - 1][x - 1] ? 1 : 0;
                    cellsAlive += oldCellsGrid[y - 1][x] ? 1 : 0;
                    cellsAlive += oldCellsGrid[y - 1][x + 1] ? 1 : 0;
                    cellsAlive += oldCellsGrid[y][x - 1] ? 1 : 0;
                    // cellsAlive += oldCellsGrid[y][x] ? 1 : 0; // Current cell
                    cellsAlive += oldCellsGrid[y][x + 1] ? 1 : 0;
                    cellsAlive += oldCellsGrid[y + 1][x - 1] ? 1 : 0;
                    cellsAlive += oldCellsGrid[y + 1][x] ? 1 : 0;
                    cellsAlive += oldCellsGrid[y + 1][x + 1] ? 1 : 0;

                    setCell(x, y, cellsAlive);
                }
            }

            // Borders
            let countCells = (x, y) => {
                let cellsAlive = 0;
                cellsAlive += y > 0 && x > 0 && oldCellsGrid[y - 1][x - 1] ? 1 : 0;
                cellsAlive += y > 0 && oldCellsGrid[y - 1][x] ? 1 : 0;
                cellsAlive += y > 0 && x < cellsPerRow - 1 && oldCellsGrid[y - 1][x + 1] ? 1 : 0;
                cellsAlive += x > 0 && oldCellsGrid[y][x - 1] ? 1 : 0;
                // cellsAlive += oldCellsGrid[y][x] ? 1 : 0; // Current cell
                cellsAlive += x < cellsPerRow - 1 && oldCellsGrid[y][x + 1] ? 1 : 0;
                cellsAlive += y < cellsPerColumn - 1 && x > 0 && oldCellsGrid[y + 1][x - 1] ? 1 : 0;
                cellsAlive += y < cellsPerColumn - 1 && oldCellsGrid[y + 1][x] ? 1 : 0;
                cellsAlive += y < cellsPerColumn - 1 && x < cellsPerRow - 1 && oldCellsGrid[y + 1][x + 1] ? 1 : 0;
                return cellsAlive;
            }
            for (let y of [0, cellsPerColumn - 1]) {
                for (let x = 0; x < cellsPerRow; x++) {
                    setCell(x, y, countCells(x, y));
                }
            }
            for (let x of [0, cellsPerRow - 1]) {
                for (let y = 0; y < cellsPerColumn; y++) {
                    setCell(x, y, countCells(x, y));
                }
            }
        }


        // Draw
        p.background(255);
        p.fill(0);
        for (let y = 0; y < cellsPerColumn; y++) {
            for (let x = 0; x < cellsPerRow; x++) {
                if (cellsGrid[y][x]) {
                    p.rect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }
};

new p5(p5f, "p5Block");
