const header = {
  title: "Mayank Thakur",
  links: [
    {
      name: "About",
      href: "index.html",
    },
    {
      name: "Blogs",
      href: "blogs.html",
    },
    {
      name: "DSA",
      href: "Mayank_DSA_Journal.html",
    },
    {
      name: "Behavioral",
      href: "behavioral-roadmap.html",
    },
    {
      name: "JavaScript",
      href: "js-mastery-journal.html",
    },
    {
      name: "React",
      href: "react-mastery-journal.html",
    },
    {
      name: "Machine Coding",
      href: "machine-coding-journal.html",
    },
    {
      name: "TypeScript",
      href: "typescript-mastery-journal.html",
    },
  ],
};


function renderHeader() {
  let heading = `
   <nav class="g-nav">

   </nav>
   `;

  let links = header.links.map((item) => {
    return `
    <a href="${item.href}" class="g-nav-link">
      <span>${item.name}</span>
    </a>
    `;
  })

  links = links.join("");

  heading = heading.replace("", links);
  document.body.prepend(heading);
}
renderHeader();

