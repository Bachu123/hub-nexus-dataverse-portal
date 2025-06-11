export const hilSystemArchitecture = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HIL System Architecture</title>

  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

  <style>
    body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
    .card {
      background-color: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);
      padding: 1.25rem;
      text-align: center;
    }
    .logo-img { max-height: 40px; width: auto; object-fit: contain; margin-inline: auto; }
    .sub-logo { height: 28px; width: auto; object-fit: contain; margin-inline: auto; }
    .db-logo { height: 44px; width: auto; margin-inline: auto; }
    .invert-on-dark { filter: brightness(0) invert(1); }
  </style>
</head>

<body class="p-4 sm:p-6 md:p-8">
  <div class="max-w-7xl mx-auto">

    <h1 class="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
      HIL System Architecture
    </h1>

    <div class="relative hidden lg:block">

      <div class="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-full pr-10">
        <div class="card w-72">
          <h3 class="font-bold text-lg text-gray-800">HIL Task Workbench</h3>
          <p class="text-sm text-gray-500 mb-4">Human Signal & Annotation</p>
          
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-gray-50 border rounded-lg p-3">
              <img src="https://user-images.githubusercontent.com/12534576/192582340-4c9e4401-1fe6-4dbb-95bb-fdbba5493f61.png" class="sub-logo" alt="Label Studio logo" />
              <p class="text-xs font-semibold text-gray-600 mt-2">Label Studio</p>
            </div>
            <div class="bg-gray-50 border rounded-lg p-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/CVAT-logo.svg/1200px-CVAT-logo.svg.png" class="sub-logo" alt="CVAT logo" />
              <p class="text-xs font-semibold text-gray-600 mt-2">CVAT</p>
            </div>
            <div class="bg-gray-50 border rounded-lg p-3">
              <img src="https://assets.v7labs.com/website/v7_logo.svg" class="sub-logo" style="filter: grayscale(100%) opacity(0.8);" alt="V7 logo" />
              <p class="text-xs font-semibold text-gray-600 mt-2">V7</p>
            </div>
             <div class="bg-gray-50 border rounded-lg p-3">
              <img src="https://www.superannotate.com/hubfs/SuperAnnotate_logo_black%201.svg" class="sub-logo" style="filter: grayscale(100%) opacity(0.8);" alt="SuperAnnotate logo" />
              <p class="text-xs font-semibold text-gray-600 mt-2">SuperAnnotate</p>
            </div>
            <div class="bg-gray-50 border rounded-lg p-3 col-span-2">
              <img src="https://raw.githubusercontent.com/label-u/LabelLLM/main/docs/logo.png" class="sub-logo h-8" alt="LabelLLM logo" />
              <p class="text-xs font-semibold text-gray-600 mt-1">LabelLLM</p>
            </div>
          </div>

        </div>
      </div>

      <div class="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full pl-10">
        <div class="card w-56">
          <h3 class="font-bold text-lg text-gray-800">HIL TA Platform</h3>
          <img src="https://www.oneforma.com/wp-content/uploads/2024/07/logo.png" class="my-4 logo-img" alt="OneForma logo" />
          <p class="text-sm text-gray-500">Talent Acquisition</p>
        </div>
      </div>

      <div class="border-2 border-dashed border-gray-400 rounded-2xl p-4 md:p-6">

        <div class="flex justify-center gap-16 mb-6">
          <div class="text-center w-36">
            <div class="bg-gray-200 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <p class="mt-3 font-semibold text-gray-700">Manual</p>
            <p class="text-xs text-gray-500">Self-Service UI</p>
          </div>
          <div class="text-center w-36">
            <div class="bg-gray-200 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 0a2 2 0 100-4m0 4a2 2 0 110-4M6 20v-2m0 2a2 2 0 100-4m0 4a2 2 0 110-4m12 0a2 2 0 100-4m0 4a2 2 0 110-4" />
              </svg>
            </div>
            <p class="mt-3 font-semibold text-gray-700">Automation</p>
            <p class="text-xs text-gray-500">AI Service</p>
          </div>
        </div>

        <div class="flex justify-center mb-2">
          <svg width="120" height="50" viewBox="0 0 100 40" class="text-gray-400">
            <path d="M20 0V20M80 0V20M20 20h60M50 20v15M45 28l5 7 5-7" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </div>

        <div class="text-center font-semibold text-gray-600 mb-4">HIL Task Manager</div>
        <div class="border border-gray-400 border-dashed rounded-lg px-3 py-2 text-center font-semibold text-gray-600 mb-6">API Facade</div>

        <div class="card p-6 bg-gray-700 text-white">
          <h2 class="text-xl font-bold mb-5">HIL App Server</h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="card bg-gray-600 text-white flex items-center justify-center p-4">
              <h3 class="font-bold text-base">Tasks Coordinator</h3>
            </div>
            <div class="bg-gray-50 border rounded-lg p-3 text-gray-800 text-sm grid grid-cols-2 gap-2">
              <div class="bg-white p-2 rounded border text-xs">Task Management</div>
              <div class="bg-white p-2 rounded border text-xs">Template Management</div>
              <div class="bg-white p-2 rounded border text-xs">Identity & Auth</div>
              <div class="bg-white p-2 rounded border text-xs">TA Management</div>
              <div class="bg-white p-2 rounded border text-xs">Alerts & Escalations</div>
              <div class="bg-white p-2 rounded border text-xs">Metering & Billing</div>
              <div class="bg-white p-2 rounded border text-xs col-span-2">Dashboards & Reports</div>
              <div class="bg-white p-2 rounded border text-xs col-span-2">Project & Workspace Mgmt</div>
            </div>
            <div class="card bg-gray-600 text-white flex items-center justify-center p-4">
              <h3 class="font-bold text-base">TA Coordinator</h3>
            </div>
          </div>
          <div class="mt-6 border-t border-gray-500 pt-5 flex justify-around text-gray-300">
            <div class="text-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" class="db-logo invert-on-dark" alt="PostgreSQL" />
              <p class="font-semibold text-sm mt-2">PostgreSQL</p>
            </div>
            <div class="text-center">
              <img src="https://azure.microsoft.com/svghandler/cosmos-db/?width=600&height=315" class="db-logo invert-on-dark" alt="CosmosDB" />
              <p class="font-semibold text-sm mt-2">CosmosDB</p>
            </div>
            <div class="text-center">
              <img src="https://static-00.iconduck.com/assets.00/redis-icon-2048x1749-sfqcx1af.png" class="db-logo invert-on-dark" alt="Redis" />
              <p class="font-semibold text-sm mt-2">Redis</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">

      <div class="card">
        <h3 class="font-bold text-lg text-gray-800">HIL Task Workbench</h3>
        <p class="text-sm text-gray-500 mb-4">Human Signal & Annotation</p>
        
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-gray-50 border rounded-lg p-3">
            <img src="https://user-images.githubusercontent.com/12534576/192582340-4c9e4401-1fe6-4dbb-95bb-fdbba5493f61.png" class="sub-logo" alt="Label Studio logo" />
            <p class="text-xs font-semibold text-gray-600 mt-2">Label Studio</p>
          </div>
          <div class="bg-gray-50 border rounded-lg p-3">
            <img src="https://cdn.prod.website-files.com/62c2f68750086204ad7a18f9/67051b7a1c91e551974d837b_AD_4nXeARYUZO1zKPAS-uxBDHIEFJwKPtTNH60ngrG4cmijZC5TQHhXstW4b8u8tQV9wX4g6TyFcJVChEv0sY1fKLAHsWmhfP5gerSDObq3LgfMO529-EWbVDGvoCwKZG0pNAL90Uuuz8gh3qklA2ueXZafS-7v_HsZoVz-_HFdr.png" class="sub-logo" alt="CVAT logo" />
            <p class="text-xs font-semibold text-gray-600 mt-2">CVAT</p>
          </div>
          <div class="bg-gray-50 border rounded-lg p-3">
            <img src="https://assets.v7labs.com/website/v7_logo.svg" class="sub-logo" style="filter: grayscale(100%) opacity(0.8);" alt="V7 logo" />
            <p class="text-xs font-semibold text-gray-600 mt-2">V7</p>
          </div>
           <div class="bg-gray-50 border rounded-lg p-3">
            <img src="https://www.superannotate.com/hubfs/SuperAnnotate_logo_black%201.svg" class="sub-logo" style="filter: grayscale(100%) opacity(0.8);" alt="SuperAnnotate logo" />
            <p class="text-xs font-semibold text-gray-600 mt-2">SuperAnnotate</p>
          </div>
          <div class="bg-gray-50 border rounded-lg p-3 col-span-2">
            <img src="https://raw.githubusercontent.com/label-u/LabelLLM/main/docs/logo.png" class="sub-logo h-8" alt="LabelLLM logo" />
            <p class="text-xs font-semibold text-gray-600 mt-1">LabelLLM</p>
          </div>
        </div>

      </div>

      <div class="card">
        <h3 class="font-bold text-lg text-gray-800">HIL TA Platform</h3>
        <img src="https://www.oneforma.com/wp-content/uploads/2024/07/logo.png" class="my-4 logo-img" alt="OneForma logo" />
        <p class="text-sm text-gray-500">Talent Acquisition</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const hilCreateTaskHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>HIL Create Task Service – Alignment Fixed</title>

  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />

  <style>
    :root {
      --bg-color:  #f4f4f5;
      --surface:   #ffffff;
      --primary:   #18181b;
      --secondary: #71717a;
      --accent:    #d4d4d8;
      --highlight: #2563eb;
      --priority:  #db2777;
      --success:   #16a34a;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 50px;
      font-family: 'Fira Code', monospace;
      background: var(--bg-color);
      color: var(--primary);
    }
    .master-container {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      gap: 80px;
      justify-items: center;
    }
    @media (max-width: 1000px) { .master-container { grid-auto-flow: row; } }
    .flow-column { display: flex; flex-direction: column; align-items: center; width: 450px; gap: 30px; }
    .terminator,
    .process,
    .sub-process {
      width: 100%;
      background: var(--surface);
      border: 1px solid var(--accent);
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      padding: 15px 20px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .terminator         { border-radius: 30px; }
    .terminator.end .node-icon { fill: var(--success); }
    .node-icon { flex-shrink: 0; width: 28px; height: 28px; fill: var(--primary); }
    .node-text .title { font-weight: 500; }
    .node-text .description { margin-top: 4px; font-size: 0.8em; color: var(--secondary); }
    .connector { width: 2px; height: 40px; background: var(--accent); position: relative; }
    .connector::after { content: ''; position: absolute; left: 50%; bottom: -1px; transform: translateX(-50%); border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--accent); }
    .branch-wrapper { display: flex; flex-direction: column; align-items: center; gap: 60px; }
    .decision { position: relative; width: 200px; height: 200px; background: var(--surface); border: 1px solid var(--accent); transform: rotate(45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .decision .node-text { transform: rotate(-45deg); text-align: center; font-weight: 500; }
    .dispatch-arrow { position: absolute; top: 50%; left: calc(100% + 20px); transform: translateY(-50%); display: flex; flex-direction: column; align-items: flex-start; pointer-events: none; }
    .dispatch-arrow-label { margin-bottom: 6px; font-size: 0.9em; font-weight: 500; color: var(--highlight); background: var(--bg-color); padding: 0 6px; white-space: nowrap; }
    .dispatch-arrow-line { width: 90px; height: 2px; background: var(--highlight); position: relative; }
    .dispatch-arrow-line::after { content: ''; position: absolute; right: 0; top: -5px; border-left: 12px solid var(--highlight); border-top: 6px solid transparent; border-bottom: 6px solid transparent; }
    .branch-paths { display: flex; gap: 30px; justify-content: center; flex-wrap: wrap; width: 100%; }
    .branch-path { flex: 0 1 45%; max-width: 45%; display: flex; flex-direction: column; align-items: center; position: relative; z-index: 1; }
    .branch-path::before { content: ''; position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 2px; height: 20px; background: var(--accent); }
    @media (max-width: 700px) { .branch-paths { flex-direction: column; } .branch-path { max-width: 100%; flex: 1 1 100%; } }
    .redis-queues { border: 2px dashed var(--accent); border-radius: 8px; padding: 20px; background: #fafafa; width: 100%; }
    .queue { border: 1px solid var(--accent); border-radius: 4px; padding: 10px; font-size: 0.9em; margin-bottom: 12px; }
    .queue.high-priority { border-color: var(--priority); }
    .message { margin-top: 5px; font-size: 0.75em; background: #e0e7ff; color: #3730a3; padding: 5px; border-radius: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  </style>
</head>
<body>
<svg width="0" height="0" style="position:absolute">
  <symbol id="icon-start" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></symbol>
  <symbol id="icon-end" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></symbol>
  <symbol id="icon-db" viewBox="0 0 24 24"><path d="M12 3c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6c-4.42 0-8-1.79-8-4v4c0 2.21 3.58 4 8 4s8-1.79 8-4V5c0 2.21-3.58 4-8 4zm0 6c-4.42 0-8-1.79-8-4v4c0 2.21 3.58 4 8 4s8-1.79 8-4v-4c0 2.21-3.58 4-8 4z"/></symbol>
  <symbol id="icon-redis" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></symbol>
  <symbol id="icon-worker" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></symbol>
  <symbol id="icon-download" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"/></symbol>
  <symbol id="icon-process" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.30-.61-.22l-2.49 1c-.52-.40-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12.64l2 3.46c.12.22.39.30.61.22l2.49-1c.52-.40 1.08-.73 1.69-.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23-.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.50c-1.93 0-3.50-1.57-3.50-3.50s1.57-3.50 3.50-3.50 3.50 1.57 3.50 3.50-1.57 3.50-3.50 3.50z"/></symbol>
</svg>
<div class="master-container">
  <div class="flow-column">
    <div class="terminator start"><svg class="node-icon"><use href="#icon-start"/></svg><div class="node-text"><div class="title">Start: HIL Task Creation Request</div></div></div>
    <div class="connector"></div>
    <div class="process"><svg class="node-icon"><use href="#icon-db"/></svg><div class="node-text"><div class="title">Create Task Placeholder in DB</div><div class="description">Insert task with ‘CREATING’ status in PostgreSQL.</div></div></div>
    <div class="connector"></div>
    <div class="branch-wrapper">
      <div class="decision"><div class="node-text">Create Plugin Placeholder</div><div class="dispatch-arrow"><div class="dispatch-arrow-label">Dispatch Data Loading Task (Async)</div><div class="dispatch-arrow-line"></div></div></div>
      <div class="branch-paths">
        <div class="branch-path"><div class="process"><div class="node-text"><div class="title">Workbench Plugin</div><div class="description">Creates an empty task placeholder in Label Studio, etc.</div></div></div></div>
        <div class="branch-path"><div class="process"><div class="node-text"><div class="title">TA Plugin</div><div class="description">Creates an empty project placeholder in OneForma.</div></div></div></div>
      </div>
    </div>
    <div class="connector"></div>
    <div class="terminator end"><svg class="node-icon"><use href="#icon-end"/></svg><div class="node-text"><div class="title">End: Return Immediate Response</div><div class="description">Return task ID. Data loading runs in the background.</div></div></div>
  </div>
  <div class="flow-column">
    <div class="sub-process"><svg class="node-icon"><use href="#icon-redis"/></svg><div class="node-text"><div class="title">Redis (Message Broker)</div><div class="description">Routes data-loading task to a queue based on payload size.</div><div class="redis-queues"><div class="queue high-priority">large_payload_queue<div class="message">{ id: 'xyz-789', coords: '…', size: '5 GB' }</div></div><div class="queue">default_payload_queue<div class="message">{ id: 'abc-123', coords: '…', size: '10 MB' }</div></div></div></div></div>
    <div class="connector"></div>
    <div class="process"><svg class="node-icon"><use href="#icon-worker"/></svg><div class="node-text"><div class="title">Celery Worker</div><div class="description">Pulls task from queue (processes default queue first).</div></div></div>
    <div class="connector"></div>
    <div class="process"><svg class="node-icon"><use href="#icon-download"/></svg><div class="node-text"><div class="title">Fetch Data Using Coordinates</div><div class="description">Downloads data (images, text) from blob storage.</div></div></div>
    <div class="connector"></div>
    <div class="process"><svg class="node-icon"><use href="#icon-process"/></svg><div class="node-text"><div class="title">Add Data to Workbench</div><div class="description">Pushes downloaded data into the task placeholder.</div></div></div>
    <div class="connector"></div>
    <div class="process"><svg class="node-icon"><use href="#icon-db"/></svg><div class="node-text"><div class="title">Update Task Status in Database</div><div class="description">Record set to ‘ACTIVE’ or ‘FAILED’ in PostgreSQL.</div></div></div>
  </div>
</div>
</body>
</html>
`;

export const hilOutputProcessingHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HIL Output Processing Service - Simplified Flowchart</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
        :root {
            --bg-color: #f4f4f5;
            --surface-color: #ffffff;
            --primary-text: #18181b;
            --secondary-text: #71717a;
            --accent-color: #d4d4d8;
            --highlight-color: #2563eb;
            --success-color: #16a34a;
            --error-color: #dc2626;
        }
        body {
            font-family: 'Fira Code', monospace;
            background-color: var(--bg-color);
            color: var(--primary-text);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            padding: 50px;
            overflow-x: auto;
        }
        .flow-column {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 500px;
        }
        .column-title {
            font-size: 1.5em;
            font-weight: 500;
            margin-bottom: 30px;
            color: var(--highlight-color);
            border-bottom: 2px solid var(--highlight-color);
            padding-bottom: 10px;
            width: 100%;
        }
        .flow-step, .terminator, .process, .io {
            border: 1px solid var(--accent-color);
            background-color: var(--surface-color);
            padding: 15px 20px;
            margin: 0;
            position: relative;
            z-index: 1;
            width: 100%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            gap: 15px;
            border-radius: 6px;
        }
        .node-icon {
            width: 28px;
            height: 28px;
            fill: var(--primary-text);
            flex-shrink: 0;
        }
        .node-text { flex-grow: 1; text-align: left; }
        .node-text .title { font-weight: 500; }
        .node-text .description { font-size: 0.8em; color: var(--secondary-text); margin-top: 5px; }
        .node-text .quarantine-note { font-size: 0.75em; color: var(--error-color); margin-top: 8px; font-style: italic; }
        .connector { position: relative; width: 2px; background-color: var(--accent-color); margin: 0 auto; height: 40px; }
        .connector::after { content: ''; position: absolute; left: 50%; bottom: -1px; transform: translateX(-50%); border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid var(--accent-color); }
        .terminator { border-radius: 30px; }
    </style>
</head>
<body>
<svg width="0" height="0" style="position:absolute">
    <symbol id="icon-start" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></symbol>
    <symbol id="icon-end" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></symbol>
    <symbol id="icon-io" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></symbol>
    <symbol id="icon-process" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19-.15-.24.42.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23-.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></symbol>
    <symbol id="icon-trigger" viewBox="0 0 24 24"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.48 10 10 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/></symbol>
    <symbol id="icon-ui" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/></symbol>
    <symbol id="icon-export" viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/></symbol>
</svg>
<div class="flow-column">
    <div class="column-title">Output Processing Service</div>
    <div class="terminator"><svg class="node-icon"><use xlink:href="#icon-start"/></svg><div class="node-text"><div class="title">Start: Annotation Completed</div><div class="description">Work is finished in Label Studio, V7, OneForma, etc.</div></div></div>
    <div class="connector"></div>
    <div class="process flow-step"><svg class="node-icon"><use xlink:href="#icon-trigger"/></svg><div class="node-text"><div class="title">Service Triggered</div><div class="description">Via file watcher or periodic polling job on output folders.</div></div></div>
    <div class="connector"></div>
    <div class="process flow-step"><svg class="node-icon"><use xlink:href="#icon-process"/></svg><div class="node-text"><div class="title">Pre-Processor Module</div><div class="description">Validate schemas, normalize labels, and align to canonical formats.</div><div class="quarantine-note">Failed validations are sent to a quarantine bucket for review.</div></div></div>
    <div class="connector"></div>
    <div class="process flow-step"><svg class="node-icon"><use xlink:href="#icon-process"/></svg><div class="node-text"><div class="title">Processor Engine</div><div class="description">Transforms data to the format as per user(e.g., to COCO format) </div></div></div>
    <div class="connector"></div>
    <div class="process flow-step"><svg class="node-icon"><use xlink:href="#icon-ui"/></svg><div class="node-text"><div class="title">UI Processor</div><div class="description">Surfaces results, metrics, and summaries on the Loop Platform dashboard.</div></div></div>
    <div class="connector"></div>
    <div class="io"><svg class="node-icon"><use xlink:href="#icon-export"/></svg><div class="node-text"><div class="title">Export & Consume</div><div class="description">Push final, validated data to MLOps pipelines or model fine-tuning endpoints.</div></div></div>
    <div class="connector"></div>
    <div class="terminator"><svg class="node-icon" style="fill: var(--success-color);"><use xlink:href="#icon-end"/></svg><div class="node-text"><div class="title">End: Training-Ready Data Generated</div><div class="description">High-quality, governed data is ready for model consumption.</div></div></div>
</div>
</body>
</html>
`;

export const systemArchitecturePages = [
  { id: 'system', title: 'HIL System Architecture', html: hilSystemArchitecture },
  { id: 'create', title: 'HIL Create Task Service', html: hilCreateTaskHTML },
  { id: 'output', title: 'HIL Output Processing Service', html: hilOutputProcessingHTML }
];
