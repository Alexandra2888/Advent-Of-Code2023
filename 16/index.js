let lines = require('fs').readFileSync('./input.txt','utf8').split(/\r?\n/).map(line=>line.split(''))

const emit = {  // 0:right 1:up 2:left 3:down
    '.':    [[0],[1],[2],[3]],
    '/':    [[1],[0],[3],[2]],
    '\\':   [[3],[2],[1],[0]],
    '|': [[1,3],[1],[1,3],[3]],
    '-': [[0],[0,2],[2],[0,2]],
}
const dx = [1,0,-1,0]
const dy = [0,-1,0,1]
const inside = (nx, ny) => ny >= 0 && ny < lines.length && nx >= 0 && nx < lines[0].length;

const p1 = (yy=0,xx=0,ddir=0)=> {
    let lzr = lines.map(line=>line.map(char=>[0,0,0,0]))
    let queue = [{x:xx,y:yy,dir:ddir}]
    while (queue.length){
        let {x,y,dir} = queue.shift()
        lzr[y][x][dir] = 1
        let char = lines[y][x]
        emit[char][dir].map(ndir=>{
            let [nx,ny] = [x+dx[ndir],y+dy[ndir]]
            if (inside(nx,ny) && !lzr[ny][nx][ndir]) 
            queue.push({x:nx,y:ny,dir:ndir})
        })
    }
    return lzr.map(line=>line.reduce((a,b)=> b.includes(1)?a+1:a,0)).reduce((a,b)=>a+b,0)
}

const p2 = ()=> {
    const edges = []
    for (let i=0; i < lines[0].length; i++) {
        edges.push([0,i,3])
        edges.push([lines.length-1,i,1])
    }
    for (let i=0; i < lines.length; i++) {
        edges.push([i,0,0])
        edges.push([i,lines[0].length-1,2])
    }
    return edges.map(edge=>p1(...edge)).reduce((a,b)=>a>b?a:b,0)
}

console.log("p1:",p1())
console.log("p2:",p2())