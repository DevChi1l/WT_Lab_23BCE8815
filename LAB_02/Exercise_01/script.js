// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    // Original required shapes:
    
    // 1. Filled rectangle (blue)
    ctx.fillStyle = '#34db4aff';
    ctx.fillRect(50, 50, 100, 80);
    
    // 2. Filled circle (red)
    ctx.fillStyle = '#4732b1ff';
    ctx.beginPath();
    ctx.arc(400, 100, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // 3. Straight line (green)
    ctx.strokeStyle = '#cc582eff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(450, 200);
    ctx.stroke();
    
    // 4. Text "HTML5 Canvas"
    ctx.font = '24px Arial';
    ctx.fillStyle = '#0988baff';
    ctx.textAlign = 'center';
    ctx.fillText('HTML5 Canvas', 250, 280);
    
    // Additional shapes:
    
    // 5. Triangle (purple)
    ctx.fillStyle = '#9b59b6';
    ctx.beginPath();
    ctx.moveTo(150, 180);
    ctx.lineTo(200, 120);
    ctx.lineTo(250, 180);
    ctx.closePath();
    ctx.fill();
    
    // 6. Empty rectangle with border (orange)
    ctx.strokeStyle = '#e67e22';
    ctx.lineWidth = 2;
    ctx.strokeRect(300, 50, 80, 60);
    
    
    // 8. Line with arrow (dark gray)
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(400, 180);
    ctx.lineTo(400, 250);
    
    // Draw arrow head
    ctx.lineTo(390, 240);
    ctx.moveTo(400, 250);
    ctx.lineTo(410, 240);
    ctx.stroke();
});