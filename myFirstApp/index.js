import fs from "fs";

function getQuestions() {
  return fs.readFileSync("./z_questions.txt", "utf8").split(/\r?\n/);
}

function ask(questions, index) {
  if (index >= questions.length) {
    console.log("Thank you");
    process.exit();
  }

  process.stdout.write(`${questions[index]} `);

  process.stdin.once("data", (answer) => {
    fs.appendFileSync("./z_answers.txt", `${questions[index]} -> ${answer.toString().trim()}\n`);
    ask(questions, index + 1);
  });
}

function main() {
  const questions = getQuestions();
  if (questions.every((question) => question.trim() === "")) {
    return;
  }
  return ask(questions, 0);
}

main();