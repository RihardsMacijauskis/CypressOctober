function fizzBuzz(number) {
    if (number % 3 === 0 && number % 5 === 0){
        return "fizzbuzz"
    }
    if (number % 3 === 0 ) {
        return "fizz"
    }
    if( number % 5 === 0 ) {
        return "buzz"
    }
    return "Not a multiple of 3 or 5"
}

function fizzBuzzChecker(array, expectedResult){
    array.forEach((number) => {
        expect(fizzBuzz(number)).to.eq(expectedResult)
    })
}

describe("First day unit test example", () => {
    it("Return fizz if the number is a multiple of 3", () => {
        fizzBuzzChecker([3,6,9,12,18], "fizz")
    })
    it("Return buzz if the number is a multiple of 5", () => {
        fizzBuzzChecker([5,10,25,35], "buzz")
    })
    it("Return fizzbuzz if the number is a multiple of 3 or 5", () => {
        fizzBuzzChecker([15,30,45,60], "fizzbuzz")
    })
    it("Return Not a multiple of 3 or 5", () => {
        fizzBuzzChecker([1,2,4], "Not a multiple of 3 or 5")
    })
})