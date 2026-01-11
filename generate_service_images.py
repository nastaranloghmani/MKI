from PIL import Image, ImageDraw, ImageFilter
import math

# Define the teal/cyan color palette matching your website
COLORS = {
    'teal_light': (93, 190, 189),      # #5DBEBD
    'teal_dark': (20, 184, 166),       # #14B8A6
    'cyan': (34, 211, 238),            # #22D3EE
    'blue': (59, 130, 246),            # #3B82F6
    'emerald': (16, 185, 129),         # #10B981
    'dark_bg': (15, 23, 42),           # #0F172A (slate-950)
    'light_bg': (248, 250, 252),       # #F8FAFC (slate-50)
}

def create_gradient_background(width, height, color1, color2, angle=45):
    """Create a gradient background"""
    image = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(image)

    # Create diagonal gradient
    for y in range(height):
        for x in range(width):
            # Calculate position along gradient
            if angle == 45:
                ratio = (x + y) / (width + height)
            elif angle == 135:
                ratio = (width - x + y) / (width + height)
            else:
                ratio = y / height

            # Interpolate between colors
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)

            draw.point((x, y), fill=(r, g, b))

    return image

def add_grid_pattern(image, grid_size=80, color=(93, 190, 189), opacity=20):
    """Add a subtle grid pattern overlay"""
    overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    width, height = image.size

    # Draw vertical lines
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill=(*color, opacity), width=2)

    # Draw horizontal lines
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill=(*color, opacity), width=2)

    # Composite
    base = image.convert('RGBA')
    return Image.alpha_composite(base, overlay).convert('RGB')

def add_circuit_pattern(image, density=15):
    """Add circuit-like patterns"""
    overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    width, height = image.size

    import random
    random.seed(42)

    for _ in range(density):
        x1, y1 = random.randint(0, width), random.randint(0, height)
        x2 = x1 + random.randint(-200, 200)
        y2 = y1
        x3 = x2
        y3 = y2 + random.randint(-200, 200)

        color = COLORS['teal_light']
        opacity = random.randint(30, 80)

        draw.line([(x1, y1), (x2, y2)], fill=(*color, opacity), width=3)
        draw.line([(x2, y2), (x3, y3)], fill=(*color, opacity), width=3)
        draw.ellipse([x1-4, y1-4, x1+4, y1+4], fill=(*color, opacity+50))
        draw.ellipse([x3-4, y3-4, x3+4, y3+4], fill=(*color, opacity+50))

    base = image.convert('RGBA')
    return Image.alpha_composite(base, overlay).convert('RGB')

def add_glow_orbs(image, positions, colors, blur_radius=100):
    """Add glowing orbs"""
    overlay = Image.new('RGBA', image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    for (x, y), color, size in positions:
        draw.ellipse([x-size, y-size, x+size, y+size], fill=(*color, 60))

    overlay = overlay.filter(ImageFilter.GaussianBlur(blur_radius))
    base = image.convert('RGBA')
    return Image.alpha_composite(base, overlay).convert('RGB')

def create_code_development_image():
    """Custom Software Development"""
    width, height = 1200, 800

    # Gradient background
    img = create_gradient_background(width, height, COLORS['dark_bg'], (25, 35, 55), angle=135)

    # Add grid
    img = add_grid_pattern(img, grid_size=100, opacity=15)

    # Add circuit patterns
    img = add_circuit_pattern(img, density=20)

    # Add glowing orbs
    orbs = [
        ((300, 200), COLORS['teal_light'], 150),
        ((900, 600), COLORS['emerald'], 120),
        ((600, 400), COLORS['cyan'], 100),
    ]
    img = add_glow_orbs(img, orbs, blur_radius=120)

    # Draw code brackets
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Draw stylized </> brackets
    bracket_color = (*COLORS['teal_light'], 180)
    draw.polygon([(400, 300), (450, 350), (450, 450), (400, 500), (380, 500), (430, 400), (380, 300)],
                 fill=bracket_color)
    draw.polygon([(800, 300), (750, 350), (750, 450), (800, 500), (820, 500), (770, 400), (820, 300)],
                 fill=bracket_color)

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    return img

def create_cloud_infrastructure_image():
    """Cloud Infrastructure"""
    width, height = 1200, 800

    # Gradient background
    img = create_gradient_background(width, height, (15, 30, 50), (30, 50, 70), angle=45)

    # Add grid
    img = add_grid_pattern(img, grid_size=90, opacity=18)

    # Add glowing orbs
    orbs = [
        ((200, 150), COLORS['cyan'], 180),
        ((1000, 650), COLORS['teal_dark'], 150),
        ((600, 400), COLORS['blue'], 130),
    ]
    img = add_glow_orbs(img, orbs, blur_radius=140)

    # Draw cloud shapes and network connections
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Cloud nodes
    nodes = [(300, 300), (600, 250), (900, 300), (450, 500), (750, 500)]

    for i, (x, y) in enumerate(nodes):
        # Draw connections
        for j, (x2, y2) in enumerate(nodes[i+1:], i+1):
            draw.line([(x, y), (x2, y2)], fill=(*COLORS['teal_light'], 50), width=3)

        # Draw nodes
        draw.ellipse([x-40, y-40, x+40, y+40], fill=(*COLORS['cyan'], 100), outline=(*COLORS['cyan'], 200), width=4)
        draw.ellipse([x-25, y-25, x+25, y+25], fill=(*COLORS['dark_bg'], 180))

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    return img

def create_digital_transformation_image():
    """Digital Transformation"""
    width, height = 1200, 800

    # Gradient background
    img = create_gradient_background(width, height, (20, 25, 45), (30, 45, 70), angle=90)

    # Add grid
    img = add_grid_pattern(img, grid_size=70, opacity=20)

    # Add glowing orbs
    orbs = [
        ((250, 400), COLORS['teal_dark'], 200),
        ((950, 400), COLORS['blue'], 180),
    ]
    img = add_glow_orbs(img, orbs, blur_radius=150)

    # Draw transformation arrow and geometric shapes
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Old system (squares)
    for i in range(3):
        y = 250 + i * 100
        draw.rectangle([150, y, 250, y+60], outline=(*COLORS['teal_light'], 100), width=4)

    # Arrow
    arrow_color = (*COLORS['teal_light'], 150)
    draw.polygon([(350, 350), (500, 350), (500, 320), (600, 400), (500, 480), (500, 450), (350, 450)],
                 fill=arrow_color)

    # New system (hexagons - simplified as circles with glow)
    for i in range(3):
        y = 250 + i * 100
        draw.ellipse([900, y, 1000, y+60], fill=(*COLORS['cyan'], 120), outline=(*COLORS['cyan'], 200), width=4)

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    return img

def create_web_mobile_image():
    """Web & Mobile Solutions"""
    width, height = 1200, 800

    # Gradient background
    img = create_gradient_background(width, height, (18, 28, 48), (25, 40, 60), angle=135)

    # Add grid
    img = add_grid_pattern(img, grid_size=85, opacity=16)

    # Add glowing orbs
    orbs = [
        ((300, 400), COLORS['emerald'], 170),
        ((900, 400), COLORS['teal_light'], 160),
        ((600, 250), COLORS['cyan'], 140),
    ]
    img = add_glow_orbs(img, orbs, blur_radius=130)

    # Draw devices
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Desktop monitor
    monitor_color = (*COLORS['teal_light'], 150)
    draw.rounded_rectangle([350, 200, 650, 500], radius=15, outline=monitor_color, width=5)
    draw.rectangle([370, 220, 630, 460], fill=(*COLORS['dark_bg'], 200))
    draw.rectangle([540, 500, 560, 530], fill=monitor_color)
    draw.ellipse([520, 530, 580, 545], fill=monitor_color)

    # Mobile phone
    phone_color = (*COLORS['cyan'], 150)
    draw.rounded_rectangle([750, 250, 900, 550], radius=25, outline=phone_color, width=5)
    draw.rectangle([770, 280, 880, 520], fill=(*COLORS['dark_bg'], 200))
    draw.ellipse([815, 530, 835, 540], fill=phone_color)

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    return img

def create_cybersecurity_image():
    """Cybersecurity"""
    width, height = 1200, 800

    # Gradient background
    img = create_gradient_background(width, height, (12, 20, 35), (25, 35, 55), angle=45)

    # Add grid
    img = add_grid_pattern(img, grid_size=75, opacity=22)

    # Add circuit patterns
    img = add_circuit_pattern(img, density=12)

    # Add glowing orbs
    orbs = [
        ((600, 400), COLORS['cyan'], 220),
        ((300, 250), COLORS['teal_dark'], 140),
        ((900, 550), COLORS['teal_light'], 160),
    ]
    img = add_glow_orbs(img, orbs, blur_radius=160)

    # Draw shield
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Shield shape
    shield_color = (*COLORS['cyan'], 180)
    shield_points = [
        (600, 200),  # top
        (750, 250),  # top right
        (750, 450),  # bottom right
        (600, 550),  # bottom point
        (450, 450),  # bottom left
        (450, 250),  # top left
    ]
    draw.polygon(shield_points, outline=shield_color, width=6)

    # Shield inner design
    draw.line([(600, 250), (600, 500)], fill=(*COLORS['teal_light'], 120), width=4)
    draw.line([(500, 350), (700, 350)], fill=(*COLORS['teal_light'], 120), width=4)

    # Lock symbol in center
    lock_color = (*COLORS['cyan'], 200)
    draw.rectangle([570, 380, 630, 450], fill=(*COLORS['dark_bg'], 220), outline=lock_color, width=4)
    draw.arc([555, 340, 645, 400], 0, 180, fill=lock_color, width=4)
    draw.ellipse([595, 405, 605, 415], fill=lock_color)

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    return img

def create_emerging_tech_image():
    """Emerging Tech (AI, IoT, Blockchain)"""
    width, height = 1200, 800

    # Gradient background
    img = create_gradient_background(width, height, (18, 25, 42), (28, 40, 65), angle=90)

    # Add grid
    img = add_grid_pattern(img, grid_size=65, opacity=18)

    # Add circuit patterns
    img = add_circuit_pattern(img, density=25)

    # Add glowing orbs
    orbs = [
        ((350, 300), COLORS['blue'], 170),
        ((850, 500), COLORS['teal_light'], 160),
        ((600, 200), COLORS['cyan'], 140),
        ((600, 600), COLORS['emerald'], 130),
    ]
    img = add_glow_orbs(img, orbs, blur_radius=140)

    # Draw neural network / AI visualization
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Central node (brain/CPU)
    center_x, center_y = 600, 400
    draw.ellipse([center_x-60, center_y-60, center_x+60, center_y+60],
                 fill=(*COLORS['blue'], 100), outline=(*COLORS['blue'], 200), width=5)

    # Neural connections
    angles = [0, 45, 90, 135, 180, 225, 270, 315]
    for angle in angles:
        rad = math.radians(angle)
        x1 = center_x + math.cos(rad) * 60
        y1 = center_y + math.sin(rad) * 60
        x2 = center_x + math.cos(rad) * 200
        y2 = center_y + math.sin(rad) * 200

        draw.line([(x1, y1), (x2, y2)], fill=(*COLORS['teal_light'], 100), width=3)
        draw.ellipse([x2-20, y2-20, x2+20, y2+20],
                     fill=(*COLORS['cyan'], 120), outline=(*COLORS['cyan'], 200), width=3)

    # Add blockchain blocks
    block_color = (*COLORS['emerald'], 150)
    for i in range(4):
        x = 200 + i * 220
        draw.rectangle([x, 650, x+80, 730], outline=block_color, width=4)
        if i < 3:
            draw.line([(x+80, 690), (x+140, 690)], fill=block_color, width=3)
            draw.polygon([(x+140, 690), (x+130, 685), (x+130, 695)], fill=block_color)

    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')

    return img

# Generate all images
services = [
    ("custom-software-development", create_code_development_image),
    ("cloud-infrastructure", create_cloud_infrastructure_image),
    ("digital-transformation", create_digital_transformation_image),
    ("web-mobile-solutions", create_web_mobile_image),
    ("cybersecurity", create_cybersecurity_image),
    ("emerging-tech", create_emerging_tech_image),
]

output_dir = r"c:\Users\nasta\OneDrive\Desktop\MKI - Copy (2) - Copy\public\images\services"

for filename, create_func in services:
    print(f"Generating {filename}.jpg...")
    img = create_func()
    img.save(f"{output_dir}\\{filename}.jpg", quality=95)
    print(f"✓ Saved {filename}.jpg")

print("\n✨ All service images generated successfully!")
