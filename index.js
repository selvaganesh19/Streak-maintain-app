import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const makeCommits = (n, targetDate) => {
    if(n === 0) return simpleGit().push();
    
    // Use the target date or generate a random date within the past year
    let commitDate;
    if (targetDate) {
        commitDate = moment(targetDate).format();
    } else {
        const x = random.int(0, 54);
        const y = random.int(0, 6);
        commitDate = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();
    }
    
    const data = {
        date: commitDate,
    };
    
    console.log(`Making commit for: ${commitDate}`);
    
    jsonfile.writeFile(path, data, () => {
        simpleGit().add([path]).commit(`Commit for ${commitDate}`, { "--date": commitDate }, makeCommits.bind(this, --n, targetDate));
    });
};

// Usage examples:
// For a specific date:
makeCommits(1, "2025-06-25"); // Specific date

// For multiple commits on the same date:
// makeCommits(5, "2024-12-25");

// For random dates (original behavior):
// makeCommits(1);

// For a range of dates, you can call it multiple times:
// const dates = ["2024-12-24", "2024-12-25", "2024-12-26"];
// dates.forEach(date => makeCommits(1, date));