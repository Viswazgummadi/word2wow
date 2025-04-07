const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

async function exportPage(pageId, outputPath) {
  try {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdBlocks);
    
    fs.writeFileSync(outputPath, mdString, 'utf8');
    console.log(`Exported ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error exporting ${pageId}:`, error);
    return false;
  }
}

async function main() {
  // Export main page as index.md
  await exportPage(process.env.NOTION_PAGE_ID, './index.md');
  
  // You can add more pages here as needed
}

main();
