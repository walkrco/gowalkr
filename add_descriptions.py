#!/usr/bin/env python3

# Script to add descriptions to all exercises
import re

# Read the current file
with open('/Users/thomaswalker/Documents/projects/walkr/gowalkr/src/data/exercises.ts', 'r') as f:
    content = f.read()

# Dictionary of exercise descriptions
descriptions = {
    "Wall Handstand Hold": "Kick up to handstand against wall, hold position. Keep arms straight and strong.",
    "Reverse Lunges": "Step backward into lunge, lower back knee toward ground, return to start.",
    "Pike Push-Ups": "Start in downward dog position, lower head toward hands, push back up.",
    "Superman Hold": "Lie face down, lift chest and legs off ground simultaneously. Hold position.",
    "Side Plank Hip Dips": "Hold side plank, lower hip toward ground, lift back up. Control the movement.",
    "Wall Walks": "Start in plank facing away from wall, walk feet up wall while walking hands closer.",
    "Calf Raises": "Rise up on toes, hold briefly, lower slowly. Can be done on step for more range.",
    "Dumbbell Row": "Bend over, pull dumbbell to hip, lower slowly. Keep back straight throughout.",
    "Plank Shoulder Taps": "Hold plank position, tap opposite shoulder with hand. Keep hips stable.",
    "Box Burpee": "Perform burpee with hands on box instead of floor. Step or jump down carefully.",
    "Glute Kickbacks": "On hands and knees, kick one leg back and up. Squeeze glute at top.",
    "Bear Crawl": "Crawl forward on hands and feet, knees just off ground. Keep core tight.",
    "Crab Walk": "Sit with hands behind you, lift hips, walk on hands and feet. Face up.",
    "Squat Pulses": "Hold bottom of squat, pulse up and down in small movements. Stay low.",
    "Lunge Pulses": "Hold bottom of lunge, pulse up and down. Keep front knee over ankle.",
    "Single Leg Glute Bridge": "Bridge with one leg extended. Lift hips using single glute. Very challenging.",
    "Donkey Kicks": "On hands and knees, kick one leg up behind you. Keep knee bent at 90 degrees.",
    "Fire Hydrants": "On hands and knees, lift leg out to side like dog at fire hydrant. Keep hips level.",
    "Hollow Body Hold": "Lie on back, press lower back down, lift shoulders and legs. Hold hollow shape.",
    "V-Ups": "Lie flat, simultaneously lift legs and torso to form V shape. Touch toes if possible.",
    "Leg Raises": "Lie on back, lift straight legs to 90 degrees, lower slowly without touching floor.",
    "Reverse Crunches": "Lie on back, bring knees to chest by lifting hips off ground. Control the movement.",
    "Plank Up-Downs": "Start in plank, go down to forearms one arm at a time, return to hands.",
    "Commando Crawl": "Army crawl forward using elbows and knees. Stay low to ground.",
    "Inch Worms": "Stand, walk hands out to plank, walk feet to hands. Like measuring with inches.",
    "Single Leg Deadlift": "Balance on one leg, hinge at hip, reach toward ground. Stand back up.",
    "Archer Push-Ups": "Wide hand position, shift weight to one arm during push-up. Very advanced.",
    "Diamond Push-Ups": "Hands form diamond shape under chest. Targets triceps more than regular push-ups.",
    "Wide Grip Push-Ups": "Hands wider than shoulders. Targets chest more than regular push-ups.",
    "Decline Push-Ups": "Feet elevated on bench or step. More challenging than regular push-ups.",
    "Hindu Push-Ups": "Flow from downward dog to cobra pose. Continuous fluid movement.",
    "Dive Bomber Push-Ups": "Similar to Hindu push-ups but return to start position. Like diving motion.",
    "Spiderman Push-Ups": "During push-up, bring knee to elbow. Alternate sides each rep.",
    "T Push-Ups": "After push-up, rotate to side plank with arm reaching up. Form T shape.",
    "Clap Push-Ups": "Explosive push-up with hands leaving ground to clap. Land softly.",
    "Single Arm Push-Ups": "Push-up using only one arm. Extremely advanced movement.",
    "Handstand Push-Ups": "Inverted push-up against wall. Lower head toward ground, press back up.",
    "Wall Sit Pulses": "Hold wall sit position, pulse up and down in small movements.",
    "Wall Angels": "Back against wall, move arms up and down like making snow angel.",
    "Shoulder Shrugs": "Lift shoulders toward ears, hold briefly, lower slowly. Can add weight.",
    "Torso Twists": "Stand with arms crossed, rotate torso side to side. Keep hips facing forward.",
    "Standing Knee Raises": "Stand tall, lift knee toward chest. Alternate legs or single leg sets.",
    "Standing Oblique Crunches": "Stand, bring elbow toward lifted knee on same side. Targets side abs.",
    "Toe Touches": "Lie on back, reach toward toes with straight legs. Crunch up to touch.",
    "Heel Touches": "Lie on back, reach toward heels by crunching to side. Alternate sides.",
    "Cross Body Crunches": "Lie on back, bring opposite elbow toward knee. Targets obliques.",
    "Sit-Ups": "Lie on back, sit all the way up to knees. Full range of motion.",
    "Crunches": "Lie on back, lift shoulders off ground. Smaller movement than sit-ups.",
    "Reverse Plank": "Sit with legs extended, lift hips up. Support weight on hands behind you.",
    "Side Plank Rotations": "Hold side plank, rotate top arm under body and back up.",
    "Plank to Downward Dog": "Start in plank, push hips up to downward dog, return to plank.",
    "Downward Dog": "Hands and feet on ground, hips up high. Form inverted V shape.",
    "Cobra Stretch": "Lie face down, push chest up with arms. Stretch front of body.",
    "Child's Pose": "Kneel, sit back on heels, reach arms forward. Restful yoga position.",
    "Cat Cow Stretch": "On hands and knees, arch and round back alternately. Spinal mobility.",
    "Thread the Needle": "Side plank, thread top arm under body. Thoracic spine mobility.",
    "World's Greatest Stretch": "Lunge with rotation and reach. Hits multiple muscle groups.",
    "90/90 Hip Stretch": "Sit with both legs at 90 degrees. Stretch hips in different directions.",
    "Pigeon Pose": "One leg forward bent, other leg back straight. Deep hip stretch.",
    "Figure 4 Stretch": "Ankle on opposite knee, pull thigh toward chest. Hip and glute stretch.",
    "Seated Spinal Twist": "Sit cross-legged, rotate spine to one side. Hold and switch.",
    "Seated Forward Fold": "Sit with legs extended, fold forward over legs. Hamstring stretch.",
    "Standing Forward Fold": "Stand, fold forward at hips, let arms hang. Hamstring and back stretch.",
    "Standing Quad Stretch": "Pull heel toward glute while standing. Hold wall for balance.",
    "Standing Calf Stretch": "Step back, keep heel down, lean forward. Stretch back leg calf.",
    "Standing Hamstring Stretch": "Heel on step, lean forward over straight leg. Stretch back of thigh.",
    "Arm Crossovers": "Swing arms across body and back. Dynamic shoulder warm-up.",
    "Tricep Stretch": "Pull elbow behind head with opposite hand. Stretch back of arm.",
    "Shoulder Stretch": "Pull arm across body with opposite hand. Stretch shoulder and back.",
    "Chest Stretch": "Arm against wall, turn body away. Stretch front of shoulder and chest.",
    "Hip Flexor Stretch": "Lunge position, push hips forward. Stretch front of hip.",
    "IT Band Stretch": "Cross legs, lean to one side. Stretch outside of thigh.",
    "Glute Stretch": "Ankle on knee, pull thigh to chest. Stretch glute muscles."
}

# Add descriptions to exercises that don't have them
for exercise_name, description in descriptions.items():
    # Look for the exercise without a description
    pattern = f'{{ name: "{exercise_name}"([^}}]+)caption: "([^"]+)" }}'
    replacement = f'{{ name: "{exercise_name}"\\1caption: "\\2", description: "{description}" }}'
    content = re.sub(pattern, replacement, content)

# Write back to file
with open('/Users/thomaswalker/Documents/projects/walkr/gowalkr/src/data/exercises.ts', 'w') as f:
    f.write(content)

print("Added descriptions to exercises")