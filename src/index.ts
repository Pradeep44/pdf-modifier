import express from 'express';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/render-pdf', async (req, res) => {
  const { html, header, footer } = req.body;
  
  if (!html) {
    return res.status(400).send('Content is required');
  }

  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html);
    
    const pdf = await page.pdf({
      format: 'A4',
      displayHeaderFooter: true,
      headerTemplate: `<div>${header}</div>`,
      footerTemplate: `<div>${footer}</div>`,
      margin: {
        top: '100px',
        bottom: '100px'
      }
    });

    await browser.close();
    
    res.contentType('application/pdf');
    return res.status(201).send(pdf);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error while generating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
