package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"
)

func isNumber(s string) bool {
	_, err := strconv.Atoi(s)
	return err == nil
}

func getNumbers(input string) int {
	if len(input) == 0 {
		return 0
	}
	// Filter out non-numeric characters
	var listOfChars = strings.Split(input, "")
	var listOfNumbers []string
	var sum string
	for _, str := range listOfChars {
		if isNumber(str) {
			listOfNumbers = append(listOfNumbers, str)
		}
	}
	sum = listOfNumbers[0] + listOfNumbers[len(listOfNumbers)-1]
	num, _ := strconv.Atoi(sum)
	return num
}

func getSumOfNumbers(input string) int {
	var sum int
	var parts = strings.Split(input, "\n")

	for _, str := range parts {
		sum += getNumbers(str)
	}

	return sum
}

func main() {

	// Open file
	file, err := os.Open("../../input/day1.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Read file content
	data, err := io.ReadAll(file)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(getSumOfNumbers(string(data)))
}
