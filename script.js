function analyzeResume() {
  const resume = document.getElementById("resumeText").value.trim();
  const output = document.getElementById("output");

  if (resume === "") {
    output.innerHTML = "<p>Please paste your resume content first.</p>";
    return;
  }

  let suggestions = `
    <ul>
      <li>Ensure your resume has a clear summary section.</li>
      <li>Add measurable achievements (numbers, percentages).</li>
      <li>Use action verbs like <b>developed</b>, <b>implemented</b>, <b>designed</b>.</li>
      <li>Keep resume length to 1–2 pages.</li>
      <li>Include relevant skills and tools clearly.</li>
      <li>Check grammar and formatting consistency.</li>
    </ul>
  `;

  output.innerHTML = suggestions;
}
