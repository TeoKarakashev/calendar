export const drawRadarDiagram = (interests, counts) => {
    const canvas = document.getElementById("radarCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 120;
    const data = counts.map(count => count * (100 / 7));
    const labels = interests;
    const numAxes = data.length;
    const angleStep = (2 * Math.PI) / numAxes;

    function getPoints() {
        return data.map((value, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const valueRadius = (value / 100) * radius;
            return {
                x: centerX + Math.cos(angle) * valueRadius,
                y: centerY + Math.sin(angle) * valueRadius
            };
        });
    }

    function drawGrid(levels = 5) {
        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 1;
        for (let level = 1; level <= levels; level++) {
            ctx.beginPath();
            const levelRadius = (radius / levels) * level;
            for (let i = 0; i < numAxes; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const x = centerX + Math.cos(angle) * levelRadius;
                const y = centerY + Math.sin(angle) * levelRadius;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }
    }

    function drawAxes() {
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1;
        ctx.font = "14px Arial";
        ctx.fillStyle = "#000";
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();

            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            ctx.fillText(labels[i], labelX, labelY);
        }
    }

    function drawConnectingLines(points) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
            const nextPoint = points[(i + 1) % points.length];
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
        }
        ctx.stroke();
    }

    function drawDataPoints(points) {
        ctx.fillStyle = "blue";
        for (let { x, y } of points) {
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function drawRadarChart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        drawAxes();
        const points = getPoints();
        drawConnectingLines(points);
        drawDataPoints(points);
    }

    drawRadarChart();
};