export function createArticle({
  id,
  title,
  excerpt,
  category,
  date,
  tags,
  context,
  problem,
  solution,
  usage,
  useCases,
  examples,
  mistakes,
  trends,
}) {
  return {
    id,
    title,
    excerpt,
    category,
    date,
    author: 'Jaya Madhuri',
    tags,
    content: `## 1. Topic Title & Modern Context

${context}

## 2. The Problem

${problem}

## 3. The Solution

${solution}

## 4. How, Where & Why to Use

${usage}

## 5. Primary Industry Use Cases

${useCases}

## 6. Practical Code / Flow Examples

${examples}

## 7. Common Mistakes & Anti-Patterns

${mistakes}

## 8. Latest Updates & Trends

${trends}`,
  };
}
