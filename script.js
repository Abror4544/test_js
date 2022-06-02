// data
let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];


// DOM elements and interaction
let userRange;
const list = document.getElementById("courses")
const ascButton = document.getElementById("asc")
const descButton = document.getElementById("desc")
const rangeButton = document.getElementById("filter")
const reset = document.getElementById("reset")


// data to HTML
const appendInfo = (arr) => {

    list.innerHTML = ""

    arr.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = `${item.name} | Цены: от ${item.prices[0]} до ${item.prices[1]}`;
        list.appendChild(li);
    })

}

// change null to appropriate
const fixCoursesPrice = (arr) => arr.map((e, i) => {
    e.prices = e.prices.map((e, i) => e == null && i == 0 ? e = 0 : e == null && i == 1 ? e = Infinity : e)
    return e
})

// filter data by range
const filterCourses = (arr, range) => {

    // mark start and finish
    let [init, last] = [range[0] == null ? 0 : range[0], range[1] == null ? Infinity : range[1]]

    // return result by checking finish
    return (last <= Infinity && last > 500)
        ? fixCoursesPrice(arr).filter(e => {
            return e.prices[0] >= init
        })
        : fixCoursesPrice(arr).filter(e => {
            return e.prices[0] >= init && e.prices[1] <= last
        })


}

// sort data by condition
const sortCourses = (arr, cond = true) => {
    return cond
        ? [...fixCoursesPrice(arr).filter(e => e.prices[1] != Infinity).sort((a, b) => a.prices[1] - b.prices[1]), ...fixCoursesPrice(arr).filter(e => e.prices[1] == Infinity).sort((a, b) => a.prices[0] - b.prices[0])]
        : [...fixCoursesPrice(arr).filter(e => e.prices[1] == Infinity).sort((a, b) => b.prices[0] - a.prices[0]), ...fixCoursesPrice(arr).filter(e => e.prices[1] != Infinity).sort((a, b) => b.prices[1] - a.prices[1])]
}


rangeButton.addEventListener("click", () => {
    // interaction
    userRange = [parseInt(prompt("Цена с")), parseInt(prompt("Цена до"))]

    appendInfo(filterCourses(courses, userRange))

})

ascButton.addEventListener("click", () => {
    // sort data by checking range
    appendInfo(sortCourses(filterCourses(courses, userRange ? userRange : [0, Infinity]), true))

})

descButton.addEventListener("click", () => {
    // sort data by checking range
    appendInfo(sortCourses(filterCourses(courses, userRange ? userRange : [0, Infinity]), false))

})

reset.addEventListener("click", () => {

    userRange = [0, Infinity]

    appendInfo(courses)

})



// tests
console.log(filterCourses(courses, [null, 200]))
console.log(filterCourses(courses, [100, 350]))
console.log(filterCourses(courses, [200, null]))
console.log(sortCourses(courses, true))



appendInfo(courses)