export const redTeamingJourneyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Red Teaming User Journey</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
        :root { --bg-color: #f4f4f5; --surface-color: #ffffff; --primary-text: #18181b; --secondary-text: #71717a; --accent-color: #d4d4d8; --highlight-color: #6d28d9; --api-color: #ca8a04; --hil-color: #db2777; }
        body { font-family: 'Fira Code', monospace; background-color: var(--bg-color); color: var(--primary-text); display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 50px; overflow-x: auto; }
        .master-container { display: flex; gap: 20px; align-items: flex-start; position: relative; }
        .stage { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px; border: 2px dashed var(--accent-color); border-radius: 12px; background-color: rgba(255,255,255,0.5); min-height: 600px; }
        .stage-title { font-size: 1.25em; font-weight: 500; margin-bottom: 40px; color: var(--highlight-color); padding-bottom: 10px; white-space: nowrap; }
        .flow-step, .decision, .process, .io, .api-call, .db-step, .hil-step { border: 1px solid var(--accent-color); background-color: var(--surface-color); padding: 12px 15px; position: relative; z-index: 1; width: 220px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; align-items: center; gap: 5px; border-radius: 6px; min-height: 60px; }
        .node-text { text-align: center; }
        .node-text .title { font-weight: 500; font-size: 0.9em; }
        .node-text .description { font-size: 0.75em; color: var(--secondary-text); margin-top: 5px; }
        .api-call { border-color: var(--api-color); }
        .api-call .title { color: var(--api-color); }
        .hil-section { border: 2px dashed var(--hil-color); border-radius: 12px; padding: 20px; margin-top: 40px; }
        .hil-section .stage-title { color: var(--hil-color); }
        .hil-step { border-color: var(--hil-color); }
        .connector { position: relative; width: 2px; background-color: var(--secondary-text); margin: 10px auto; height: 30px; }
        .connector::after { content: ''; position: absolute; left: 50%; bottom: -1px; transform: translateX(-50%); border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--secondary-text); }
        .decision { transform: rotate(45deg); width: 140px; height: 140px; min-height: unset; padding: 0; justify-content: center; }
        .decision .node-text { transform: rotate(-45deg); text-align: center; }
    </style>
</head>
<body>
<div class="master-container">
    <div class="stage">
        <div class="stage-title">1. Prepare Policy & Target Model</div>
        <div class="process flow-step"><div class="node-text"><div class="title">Select categories and attach policies</div><div class="description">Params: validation categories, user-provided policies</div></div></div>
        <div class="connector"></div>
        <div class="process flow-step"><div class="node-text"><div class="title">Upload policy documents</div><div class="description">Info: Word, URL, webpage</div></div></div>
        <div class="connector"></div>
        <div class="api-call flow-step"><div class="node-text"><div class="title">Add a target model (LLM endpoint)</div><div class="description">Model provided by customer</div></div></div>
    </div>
    <div class="stage">
        <div class="stage-title">2. Generate Jailbreaking Prompts</div>
        <div class="api-call flow-step"><div class="node-text"><div class="title">Call Jailbreaking Prompt Gen API</div><div class="description">API provided by AI COE</div></div></div>
        <div class="connector"></div>
        <div class="db-step flow-step"><div class="node-text"><div class="title">Generate prompts & store in DB</div></div></div>
        <div class="connector"></div>
        <div class="db-step flow-step"><div class="node-text"><div class="title">Save jailbreaking prompts to DB</div></div></div>
        <div class="hil-section"><div class="stage-title">HIL (Optional) - Demo Purpose</div><div class="process flow-step"><div class="node-text"><div class="title">Review & Curate Prompts</div><div class="description">Input: machine prompts, policy docs, guidelines</div></div></div></div>
    </div>
    <div class="stage">
        <div class="stage-title">3. Red Teaming Evaluation</div>
        <div class="db-step flow-step"><div class="node-text"><div class="title">Fetch the latest prompts from DB</div></div></div>
        <div class="connector"></div>
        <div class="api-call flow-step"><div class="node-text"><div class="title">Call the Eval API</div><div class="description">API provided by AI COE</div></div></div>
        <div class="connector"></div>
        <div class="process flow-step"><div class="node-text"><div class="title">Generate response from target model</div></div></div>
        <div class="connector"></div>
        <div class="process flow-step"><div class="node-text"><div class="title">Categorize Response</div><div class="description">Category types: system will show N available categories for the user to evaluate against</div></div></div>
        <div class="connector"></div>
        <div class="decision"><div class="node-text"><div class="title">Flag as Violation?</div></div></div>
        <div class="connector"></div>
        <div class="db-step flow-step"><div class="node-text"><div class="title">Violates Policy?</div><div class="description">Compare LLM response with the policy</div></div></div>
    </div>
    <div class="stage">
        <div class="stage-title">4. Model Finetuning</div>
        <div class="decision"><div class="node-text"><div class="title">Needs Feedback?</div></div></div>
        <div class="connector"></div>
        <div class="db-step flow-step"><div class="node-text"><div class="title">Collect Flagged Prompts</div></div></div>
        <div class="connector"></div>
        <div class="process flow-step"><div class="node-text"><div class="title">Finetune Target Model</div><div class="description">Data stored in DB</div></div></div>
        <div class="hil-section"><div class="stage-title">HIL (Optional)</div><div class="process flow-step"><div class="node-text"><div class="title">Create a human evaluation task</div></div></div><div class="connector"></div><div class="process flow-step"><div class="node-text"><div class="title">Attach flagged prompts</div><div class="description">Input: Flagged prompts, LLM Responses</div></div></div><div class="connector"></div><div class="process flow-step"><div class="node-text"><div class="title">Curate evaluation</div></div></div><div class="connector"></div><div class="process flow-step"><div class="node-text"><div class="title">Feedback result collection</div><div class="description">Output: Flagged prompts, human responses</div></div></div></div>
    </div>
</div>
</body>
</html>`;

export const loggingModuleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise Logging Module Architecture</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap');
        :root { --bg-color: #f4f4f5; --surface-color: #ffffff; --primary-text: #18181b; --secondary-text: #71717a; --accent-color: #d4d4d8; --highlight-color: #6d28d9; --config-color: #ca8a04; --handler-color: #059669; --formatter-color: #2563eb; }
        body { margin: 0; padding: 50px; background: var(--bg-color); font-family: 'Fira Code', monospace; color: var(--primary-text); display: flex; justify-content: center; align-items: flex-start; overflow-x: auto; }
        .master-container { display: grid; grid-template-columns: 300px 1fr 300px; gap: 40px; width: 100%; max-width: 1400px; }
        .flow-column { display: flex; flex-direction: column; align-items: center; }
        .column-title { font-size: 1.3em; color: var(--highlight-color); margin-bottom: 20px; text-align: center; }
        .utility-box, .flow-step { width: 100%; background: var(--surface-color); border: 1px solid var(--accent-color); border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 12px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .utility-box.config { border-color: var(--config-color); }
        .utility-box.handler { border-color: var(--handler-color); }
        .utility-box.formatter { border-color: var(--formatter-color); }
        .flow-column.center { align-items: flex-start; }
        .flow-step { position: relative; }
        .flow-step .node-text { text-align: left; }
        .node-icon { width: 24px; height: 24px; flex-shrink: 0; fill: var(--primary-text); }
        .node-text .title { font-size: 1em; font-weight: 500; }
        .node-text .description { font-size: 0.85em; color: var(--secondary-text); }
        .connector { width: 2px; background: var(--secondary-text); height: 30px; margin: -10px auto 20px auto; position: relative; }
        .flow-column.center .connector { margin-left: 0; }
        .flow-column.center .connector::before, .flow-column.center .connector::after { left: 150px; }
        .connector::before { content: ''; position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background: var(--secondary-text); transform: translateX(-50%); }
        .connector::after { content: ''; position: absolute; bottom: -1px; left: 50%; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--secondary-text); transform: translateX(-50%); }
        .handler-list { width: 100%; }
        .handler-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .handler-row .utility-box { flex: 0 0 48%; padding: 10px; }
        .handler-row .arrow { font-size: 1.5em; color: var(--secondary-text); }
        .code-snippet { background: #1e293b; color: #e2e8f0; font-size: 0.75em; padding: 8px; border-radius: 4px; white-space: pre-wrap; border-left: 3px solid var(--formatter-color); margin-top: 6px; }
    </style>
</head>
<body>
    <div class="master-container">
        <div class="flow-column">
            <div class="column-title">1. Initialization & Context</div>
            <div class="utility-box config"><div class="node-text"><div class="title">Configuration Loader</div><div class="description">On startup, singleton reads YAML/ENV, validates schema, and defines levels, handlers & policies.</div></div></div>
            <div class="utility-box"><div class="node-text"><div class="title">Request/Task Context</div><div class="description">Middleware/Decorator creates a unique `correlation_id` and binds it to thread-local storage.</div></div></div>
        </div>
        <div class="flow-column center">
            <div class="column-title">2. Core Logging Flow</div>
            <div class="flow-step"><div class="node-text"><div class="title">1. Get Logger</div><div class="description">Service calls `get_logger(\"my.service\")`. LoggerFactory creates and wires up the logger instance.</div></div></div>
            <div class="connector"></div>
            <div class="flow-step"><div class="node-text"><div class="title">2. Log a Message</div><div class="description">Application code executes `logger.info(\"Message...\")`.</div></div></div>
            <div class="connector"></div>
            <div class="flow-step"><div class="node-text"><div class="title">3. Context Enrichment</div><div class="description">`ContextFilter` automatically adds `correlation_id`, `user_id`, etc. to the log record.</div></div></div>
            <div class="connector"></div>
            <div class="flow-step"><div class="node-text"><div class="title">4. Dispatch to Handlers</div><div class="description">The enriched record is passed to all configured handlers for parallel processing.</div></div></div>
        </div>
        <div class="flow-column">
            <div class="column-title">3. Handlers & Destinations</div>
            <div class="handler-list">
                <div class="handler-row"><div class="utility-box handler"><span class="title">Console</span></div><div class="arrow">→</div><div class="utility-box formatter"><span class="title">TextFormatter</span><div class="code-snippet">timestamp | service | LEVEL | msg...</div></div></div>
                <div class="handler-row"><div class="utility-box handler"><span class="title">File</span></div><div class="arrow">→</div><div class="utility-box formatter"><span class="title">TextFormatter</span></div></div>
                <div class="handler-row"><div class="utility-box handler"><span class="title">Redis Stream</span></div><div class="arrow">→</div><div class="utility-box formatter"><span class="title">JSONFormatter</span><div class="code-snippet">{ \"ts\": \"...\", \"lvl\": \"...\", \"ctx\": {...} }</div></div></div>
                <div class="handler-row"><div class="utility-box handler"><span class="title">Elasticsearch</span></div><div class="arrow">→</div><div class="utility-box formatter"><span class="title">JSONFormatter</span></div></div>
                <div class="handler-row"><div class="utility-box handler"><span class="title">Audit DB</span></div><div class="arrow">→</div><div class="utility-box formatter"><span class="title">JSONFormatter</span></div></div>
            </div>
        </div>
    </div>
</body>
</html>`;

export const deepfakePipelineHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deepfake Detection & Finetuning Pipeline</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
        :root { --bg-color: #f4f4f5; --surface-color: #ffffff; --primary-text: #18181b; --secondary-text: #71717a; --accent-color: #d4d4d8; --highlight-color: #6d28d9; --model-color: #059669; --data-color: #2563eb; }
        body { font-family: 'Fira Code', monospace; background-color: var(--bg-color); color: var(--primary-text); display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 50px; overflow-x: auto; }
        .master-container { display: flex; gap: 40px; align-items: flex-start; }
        .stage { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px; border: 2px dashed var(--accent-color); border-radius: 12px; background-color: rgba(255,255,255,0.5); width: 450px; }
        .stage-title { font-size: 1.25em; font-weight: 500; margin-bottom: 40px; color: var(--highlight-color); padding-bottom: 10px; white-space: nowrap; }
        .flow-step, .decision, .process, .io, .model-step, .data-step { border: 1px solid var(--accent-color); background-color: var(--surface-color); padding: 12px 15px; position: relative; z-index: 1; width: 90%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); display: flex; align-items: center; gap: 15px; border-radius: 6px; min-height: 70px; }
        .node-icon { width: 28px; height: 28px; fill: var(--primary-text); flex-shrink: 0; }
        .node-text { flex-grow: 1; text-align: left; }
        .node-text .title { font-weight: 500; font-size: 0.9em; }
        .node-text .description { font-size: 0.75em; color: var(--secondary-text); margin-top: 5px; }
        .model-step { border-color: var(--model-color); }
        .data-step { border-color: var(--data-color); }
        .connector { position: relative; width: 2px; background-color: var(--secondary-text); margin: 10px auto; height: 30px; }
        .connector::after { content: ''; position: absolute; left: 50%; bottom: -1px; transform: translateX(-50%); border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--secondary-text); }
        .decision { transform: rotate(45deg); width: 160px; height: 160px; min-height: unset; padding: 0; justify-content: center; }
        .decision .node-text { transform: rotate(-45deg); text-align: center; }
        .decision .node-icon { display: none; }
        .parallel-wrapper { display: flex; flex-direction: column; align-items: center; width: 100%; }
        .parallel-paths { display: flex; justify-content: center; gap: 20px; width: 120%; margin: 30px 0; }
        .parallel-path { display: flex; flex-direction: column; align-items: center; flex: 1; }
        .parallel-path .flow-step { width: 100%; min-height: 80px; font-size: 0.9em; }
    </style>
</head>
<body>
<svg width="0" height="0" style="position:absolute"><symbol id="icon-video" viewBox="0 0 24 24"><path d="M17 10.5V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z"/></symbol><symbol id="icon-frames" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9 2-2z"/></symbol><symbol id="icon-process" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.40-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61-.25-1.17.59-1.69.98l-2.49 1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07-.49.12-.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19-.15-.24.42.12-.64l2 3.46c.12-.22.39-.3.61-.22l2.49-1c.52-.40 1.08-.73 1.69-.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23-.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></symbol><symbol id="icon-model" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/></symbol><symbol id="icon-aggregate" viewBox="0 0 24 24"><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21v-2z"/></symbol><symbol id="icon-report" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></symbol></svg>
<div class="master-container">
    <div class="stage">
        <div class="stage-title">1. Model Finetuning Pipeline</div>
        <div class="data-step flow-step"><svg class="node-icon"><use xlink:href="#icon-video"/></svg><div class="node-text"><div class="title">Input Video Dataset</div><div class="description">Collection of authentic and known deepfake videos.</div></div></div>
        <div class="connector"></div>
        <div class="data-step flow-step"><svg class="node-icon"><use xlink:href="#icon-frames"/></svg><div class="node-text"><div class="title">Preprocessing: Video to Frames</div><div class="description">Extract individual frames from all videos.</div></div></div>
        <div class="connector"></div>
        <div class="data-step flow-step"><svg class="node-icon"><use xlink:href="#icon-process"/></svg><div class="node-text"><div class="title">Feature Extraction</div><div class="description">Detect faces, extract landmarks, and calculate optical flow.</div></div></div>
        <div class="connector"></div>
        <div class="model-step flow-step"><svg class="node-icon"><use xlink:href="#icon-model"/></svg><div class="node-text"><div class="title">Finetune Detection Models</div><div class="description">Train the ensemble of models on the prepared dataset.</div></div></div>
        <div class="connector"></div>
        <div class="model-step flow-step"><svg class="node-icon" style="transform: rotate(180deg);"><use xlink:href="#icon-aggregate"/></svg><div class="node-text"><div class="title">Save Updated Model Weights</div><div class="description">Deploy the new, improved models to the detection pipeline.</div></div></div>
    </div>
    <div class="stage">
        <div class="stage-title">2. Detection & Inference Pipeline</div>
        <div class="data-step flow-step"><svg class="node-icon"><use xlink:href="#icon-video"/></svg><div class="node-text"><div class="title">Input Video for Analysis</div><div class="description">An unknown video file is uploaded.</div></div></div>
        <div class="connector"></div>
        <div class="data-step flow-step"><svg class="node-icon"><use xlink:href="#icon-frames"/></svg><div class="node-text"><div class="title">Preprocessing: Video to Frames</div><div class="description">Extract frames for parallel analysis.</div></div></div>
        <div class="connector"></div>
        <div class="parallel-wrapper"><div class="parallel-paths"><div class="parallel-path"><div class="model-step flow-step"><div class="node-text"><div class="title">Face Detector</div><div class="description">CNN-based check for visual artifacts.</div></div></div></div><div class="parallel-path"><div class="model-step flow-step"><div class="node-text"><div class="title">Lip Sync Analyser</div><div class="description">Compares audio phonemes to lip movements.</div></div></div></div><div class="parallel-path"><div class="model-step flow-step"><div class="node-text"><div class="title">Optical Flow</div><div class="description">Checks for temporal inconsistencies between frames.</div></div></div></div></div></div>
        <div class="connector"></div>
        <div class="process flow-step"><svg class="node-icon"><use xlink:href="#icon-aggregate"/></svg><div class="node-text"><div class="title">Aggregate Scores</div><div class="description">Combine outputs from all models into a weighted score.</div></div></div>
        <div class="connector"></div>
        <div class="decision"><div class="node-text"><div class="title">Generate Final Verdict</div></div></div>
        <div class="connector"></div>
        <div class="process flow-step"><svg class="node-icon"><use xlink:href="#icon-report"/></svg><div class="node-text"><div class="title">Output: Detection Report</div><div class="description">Provides a probability score and detailed findings.</div></div></div>
    </div>
</div>
</body>
</html>`;

export const pipelineArchitectures: Record<string, Array<{ id: string; title: string; html: string }>> = {
  'red-teaming': [
    { id: 'journey', title: 'Red Teaming User Journey', html: redTeamingJourneyHTML },
    { id: 'logging', title: 'Enterprise Logging Module', html: loggingModuleHTML }
  ],
  'deepfake-detection': [
    { id: 'pipeline', title: 'Deepfake Detection Pipeline', html: deepfakePipelineHTML }
  ]
};
