export function run(input) {

    // Parse instructions and L = 0, R = 1 for easier array access later on.
    const instructions = input.trim().replaceAll("L", 0).replaceAll("R", 1).split("\n")[0]

    // Parse and create node graph structure
    const nodes = {}
    input.trim().split("\n").slice(2).forEach(node => {
        const paths = node.replace(/[\s=(),]+/g, " ").trim().split(" ")
        nodes[paths[0]] = [paths[1], paths[2]]
    })

    let totalSteps = 0;
    let currentStep = 0;
    let found = false;
    let nextDestination = "AAA";
    
    while (found == false) {
        totalSteps++;
        nextDestination = nodes[nextDestination][instructions[currentStep]]
        currentStep++;
        if (currentStep >= instructions.length) {
            currentStep = 0;
        }
        if(nextDestination == "ZZZ") {
            found = true;
        }
    }
    return totalSteps;
    
}