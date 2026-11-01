enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
    export const mestryBlock = SpriteKind.create()
    export const roof = SpriteKind.create()
    export const usedBlock = SpriteKind.create()
    export const power = SpriteKind.create()
    export const wall = SpriteKind.create()
}
/**
 * من هنا يمكنك اختيار الخلفية التي تناسبك، من خلال كتابة رقم بين 0 -> 3
 */
/**
 * From here you can select the back ground. Write a number between 1 -> 3
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mainPlayerStyle == 1) {
        fire = sprites.create(img`
            . 4 4 4 4 4 . 
            4 4 2 2 4 4 4 
            4 2 4 4 4 4 4 
            4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 
            4 4 4 4 4 4 4 
            . 4 4 4 4 4 . 
            `, SpriteKind.Fireball)
        fire.setPosition(mySprite.x, mySprite.y)
        if (direction == 0) {
            fire.vx = 150
        } else {
            fire.vx = -150
        }
        fire.ay = -500
        pause(100)
        fire.ay = 500
        pause(250)
        sprites.destroy(fire)
    }
})
// : هنا يجب عليك برمجة القفز
// 
// اولا : تأكد أن الشخصية تمشي على الأرض
// ثانيا : قم بتغير سرعة اللاعب على الرأسية ل -153
// ثالثاً : أضف صوتية مناسبة
// 
// Here you have to make your player jump:
// 1- Check if player is walking (vy==0)
// 2- change vy to (-153)
// 2- Add sound effect
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0) {
        music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        mySprite.vy = -155
    }
})
// REMOVE your old mestryBlock overlap handler and use this one instead:
sprites.onOverlap(SpriteKind.Player, SpriteKind.mestryBlock, function (player2, block) {
    // only count as a hit if the player is moving up, is below the block,
    // and the player's head touches the bottom of the block
    hitFromBottom = player2.vy < 0 && player2.y > block.y && player2.bottom >= block.top - 2
    // only count as a hit if the player is moving up, is below the block,
    // and the player's head touches the bottom of the block
    mestryBlockTileMapLocation = mysteryBox.tilemapLocation()
    // only count as a hit if the player is moving up, is below the block,
    // and the player's head touches the bottom of the block
    mestryBlockLocation = block.x
    if (hitFromBottom) {
        block.setImage(img`
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 f 4 4 4 4 4 4 4 4 4 4 f 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 4 f 4 4 4 4 4 4 4 4 4 4 f 4 f 
            4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f f f f f f f f f f f f f f f f 
            `)
        block.setKind(SpriteKind.usedBlock)
        // bounce the player down a little so it feels like a hit
        player2.vy = 120
        if (characterFit == 0) {
            Powers = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . 5 5 5 5 . . . . . . 
                . f f f f 5 b b b b 5 f f f f . 
                f f f f f 5 b b b b 5 f f f f f 
                f f f f f 5 b b b b 5 f f f f f 
                f f f f f 5 b b b b 5 f f f f f 
                f f f f f 5 b b b b 5 f f f f f 
                f f f f f 5 b b b b 5 f f f f f 
                f f f f f 5 b b b b 5 f f f f f 
                f f f f f f 5 b b 5 f f f f f f 
                f f f f f f 5 b b 5 f f f f f f 
                f f f f f f 5 b b 5 f f f f f f 
                . f f f f f 5 b b 5 f f f f f . 
                . f f f f f 5 b b 5 f f f f f . 
                . . f f f f 5 b b 5 f f f f . . 
                . . f f f f 5 b b 5 f f f f . . 
                `, SpriteKind.power)
        } else {
            Powers = sprites.create(img`
                . . . . 5 5 5 5 5 5 5 . . . . . 
                . . 5 5 5 5 4 5 4 5 5 5 5 . . . 
                . 5 5 5 . . 4 5 4 . . 5 5 5 . . 
                5 5 . . . . 4 5 4 . . . . 5 5 . 
                5 . . . . . 4 5 4 . . . . . 5 . 
                5 . . . . . 4 5 4 . . . . . 5 . 
                5 . . . . . 4 5 4 . . . . . 5 . 
                5 . . . . . 4 5 4 . . . . . 5 . 
                5 . . 5 5 5 4 5 4 5 5 5 . . 5 . 
                5 . 5 5 5 5 4 5 4 5 5 5 5 . 5 . 
                5 5 5 5 5 5 4 5 4 5 5 5 5 5 5 . 
                5 5 5 5 5 5 4 5 4 5 5 5 5 5 5 . 
                5 5 5 5 5 5 4 5 4 5 5 5 5 5 5 . 
                5 5 5 5 5 5 4 5 4 5 5 5 5 5 5 . 
                5 5 5 5 5 5 4 5 4 5 5 5 5 5 5 . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.power)
        }
        Powers.setPosition(block.x, block.y)
        // little pop-up animation
        Powers.vy = -60
        pauseUntil(() => Powers.y <= block.y - 14)
        Powers.vy = 0
    } else {
        tiles.setWallAt(mysteryBox.tilemapLocation(), true)
        pauseUntil(() => mySprite.x < mestryBlockLocation || mySprite.x > mestryBlockLocation + 15)
        tiles.setWallAt(mysteryBox.tilemapLocation(), false)
    }
    if (block.kind() == SpriteKind.usedBlock) {
        tiles.setWallAt(mysteryBox.tilemapLocation(), true)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 1
    if (characterFit == 0) {
        if (mainPlayerStyle == 0) {
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . 1 1 1 1 1 1 1 . . . . . 
                . . f f f f f f f f f . . . . 
                . . 1 1 1 1 1 1 1 1 1 1 . . . 
                . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                . 1 e 4 4 4 4 4 4 4 e e d 1 . 
                . d e e e e e e e e e e d 1 . 
                . . d e e 4 4 e e e e 1 d 1 . 
                . . . 1 e e e e e 1 d d d 1 . 
                . . d 1 1 1 1 1 1 1 d 1 1 d 1 
                . d d 1 1 1 d 1 1 1 d 1 1 4 . 
                . 4 4 1 1 1 1 1 1 1 1 1 4 4 . 
                . 4 4 1 1 1 d 1 1 1 1 1 4 4 . 
                . . . 1 1 1 1 1 1 1 1 1 . . . 
                . . . e 4 4 . . e 4 4 . . . . 
                `,img`
                . . . 1 1 1 1 1 1 1 . . . . . 
                . . f f f f f f f f f . . . . 
                . . 1 1 1 1 1 1 1 1 1 1 . . . 
                . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                . 1 e 4 4 4 4 4 4 4 e e d 1 1 
                . d e e e e e e e e e e d d 1 
                . . d e e 4 4 e e e e 1 . 1 1 
                . . . 1 e e e e e 1 1 1 . . 1 
                . 4 d 1 1 1 d 1 1 1 1 1 1 . . 
                4 4 d 1 1 1 1 1 1 1 1 1 4 4 . 
                . . . 1 1 1 1 d 1 1 1 1 . . . 
                . . . d d 1 1 1 1 1 1 1 . . . 
                . . . e 4 4 . . . . . 4 b e . 
                . . . . . . . . . . . . e . . 
                `],
            100,
            true
            )
        } else {
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . 1 1 1 1 1 1 1 . . . . . 
                . . f f f f f f f f f . . . . 
                . . 1 1 1 1 1 1 1 1 1 1 . . . 
                . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                . 1 e 4 4 4 4 4 4 4 e e d 1 . 
                . d e e e e e e e e e e d 1 . 
                . . d e e 4 4 e e e e f d 1 . 
                . . . f e e e e e f d d d 1 . 
                . . d f f 5 1 5 f f d f f d 1 
                . d d f f 5 d 5 f f d f f 4 . 
                . 4 4 f f 5 1 5 f f f f 4 4 . 
                . 4 4 f f 5 d 5 f f f f 4 4 . 
                . . . f f 5 1 5 f f f f . . . 
                . . . e 4 4 . . e 4 4 . . . . 
                `,img`
                . . . 1 1 1 1 1 1 1 . . . . . 
                . . f f f f f f f f f . . . . 
                . . 1 1 1 1 1 1 1 1 1 1 . . . 
                . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                . 1 e 4 4 4 4 4 4 4 e e d 1 1 
                . d e e e e e e e e e e d d 1 
                . . d e e 4 4 e e e e f . 1 1 
                . . . f e e e e e f f f . . 1 
                4 d f f 5 1 d 5 f f f f f . . 
                4 d f f f 5 1 1 5 f f f d d . 
                . . . f f f 5 d 1 5 f f 4 4 . 
                . . . f f f f 5 1 5 f f . . . 
                . . . e 4 4 . . . . . 4 b e . 
                . . . . . . . . . . . . e . . 
                `],
            100,
            true
            )
        }
    } else {
        if (mainPlayerStyle == 0) {
            mySprite.setImage(img`
                . . . . f f f f f f f . . . . 
                . . . f f f f f f f f f . . . 
                . . f f f f f f f f f f f . . 
                . f f e e e e e e f f f f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . f e 4 f 4 4 4 f 4 e e f f . 
                . f e 4 4 4 4 4 4 4 4 e f f . 
                . f e 4 4 3 3 3 4 4 e e f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . . f e e e e e e f f f f f . 
                . f f f f f f f f f f f f f . 
                . f f f f f f f f f f f f f . 
                . c c f f f f f f c c f f f . 
                . 4 4 f f f f f f 4 4 f f . . 
                . . f f f f f f f f f f f . . 
                . . . e e c . . e e c . . . . 
                `)
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . . f f f f f f f . . . . 
                . . . f f f f f f f f f . . . 
                . . f f f f f f f f f f f . . 
                . f f e e e e e e f f f f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . f e 4 f 4 4 4 f 4 e e f f . 
                . f e 4 4 4 4 4 4 4 4 e f f . 
                . f e 4 4 3 3 3 4 4 e e f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . . f e e e e e e f f f f f . 
                . f f f f f f f f f f f f f . 
                . f f f f f f f f f f f f f . 
                . c c f f f f f f c c f f f . 
                . 4 4 f f f f f f 4 4 f f . . 
                . . f f f f f f f f f f f . . 
                . . . e e c . . e e c . . . . 
                `,img`
                . . . f f f f f f f . . . . . 
                . . f f f f f f f f f . . . . 
                . . f f f f f f f f f f . . . 
                . f f e e e e e e e f f f . . 
                . f e 4 4 4 4 4 4 e e f f f . 
                . f e 4 f 4 4 f 4 4 e f f f . 
                . f e 4 4 4 4 4 4 4 e f f f f 
                . f e e 4 3 4 4 4 4 e f f f f 
                . . f e e e e e e e e f . f f 
                . . . f f f f f f f f f . . f 
                . 4 c f f f f f f f f f c . . 
                4 4 c f f f f f f f f f 4 4 . 
                . . . f f f f f f f f f . . . 
                . . . f f f f f f f f f . . . 
                . . . e e c . . . . . c e e . 
                . . . . . . . . . . . . e . . 
                `],
            100,
            true
            )
        } else {
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . . f f f f f f f . . . . 
                . . . f f f f f f f f f . . . 
                . . f f f f f f f f f f f . . 
                . f f 5 5 5 5 5 5 5 f f f f . 
                . f 5 5 4 4 5 4 4 5 5 f f f . 
                . f 5 4 f 4 5 4 f 4 5 5 f f . 
                . f 5 4 4 5 5 5 4 4 5 5 f f . 
                . f 5 5 5 5 5 5 5 5 5 5 f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . . f e e e e e e f f f f f . 
                . f f f f f f f f f f f f f . 
                . f f f f f f f f f f f f f . 
                . c c f f f f f f c c f f f . 
                . 4 4 f f f f f f 4 4 f f . . 
                . . f f f f f f f f f f f . . 
                . . . e e c . . e e c . . . . 
                `,img`
                . . . f f f f f f f . . . . . 
                . . f f f f f f f f f . . . . 
                . . f f f f f f f f f f . . . 
                . f f 5 5 5 5 5 5 e f f f . . 
                . f 5 5 4 5 5 4 5 5 e f f f . 
                . f 5 4 f 5 5 f 4 5 e f f f . 
                . f 5 4 4 5 5 4 4 5 e f f f f 
                . f 5 5 5 5 5 5 5 5 e f f f f 
                . . f e e e e e e e e f . f f 
                . . . f f f f f f f f f . . f 
                . 4 c f f f f f f f f f c . . 
                4 4 c f f f f f f f f f 4 4 . 
                . . . f f f f f f f f f . . . 
                . . . f f f f f f f f f . . . 
                . . . e e c . . . . . c e e . 
                . . . . . . . . . . . . e . . 
                `],
            100,
            true
            )
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    direction = 0
    if (characterFit == 0) {
        if (mainPlayerStyle == 0) {
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . . . 1 1 1 1 1 1 1 . . . 
                . . . . f f f f f f f f f . . 
                . . . 1 1 1 1 1 1 1 1 1 1 . . 
                . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                . 1 d e e 4 4 4 4 4 4 4 e 1 . 
                . 1 d e e e e e e e e e e d . 
                . 1 d 1 e e e e 4 4 e e d . . 
                . 1 d d d 1 e e e e e 1 . . . 
                1 d 1 1 d 1 1 1 1 1 1 1 d . . 
                . 4 1 1 d 1 1 1 d 1 1 1 d d . 
                . 4 4 1 1 1 1 1 1 1 1 1 4 4 . 
                . 4 4 1 1 1 1 1 d 1 1 1 4 4 . 
                . . . 1 1 1 1 1 1 1 1 1 . . . 
                . . . . 4 4 e . . 4 4 e . . . 
                `,img`
                . . . . . 1 1 1 1 1 1 1 . . . 
                . . . . f f f f f f f f f . . 
                . . . 1 1 1 1 1 1 1 1 1 1 . . 
                . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                1 1 d e e 4 4 4 4 4 4 4 e 1 . 
                1 d d e e e e e e e e e e d . 
                1 1 . 1 e e e e 4 4 e e d . . 
                1 . . 1 1 1 e e e e e 1 . . . 
                . . 1 1 1 1 1 1 d 1 1 1 d 4 . 
                . 4 4 1 1 1 1 1 1 1 1 1 d 4 4 
                . . . 1 1 1 1 d 1 1 1 1 . . . 
                . . . 1 1 1 1 1 1 1 d d . . . 
                . e b 4 . . . . . 4 4 e . . . 
                . . e . . . . . . . . . . . . 
                `],
            100,
            true
            )
        } else {
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . . . 1 1 1 1 1 1 1 . . . 
                . . . . f f f f f f f f f . . 
                . . . 1 1 1 1 1 1 1 1 1 1 . . 
                . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                . 1 d e e 4 4 4 4 4 4 4 e 1 . 
                . 1 d e e e e e e e e e e d . 
                . 1 d f e e e e 4 4 e e d . . 
                . 1 d d d f e e e e e f . . . 
                1 d f f d f f 5 1 5 f f d . . 
                . 4 f f d f f 5 d 5 f f d d . 
                . 4 4 f f f f 5 1 5 f f 4 4 . 
                . 4 4 f f f f 5 d 5 f f 4 4 . 
                . . . f f f f 5 1 5 f f . . . 
                . . . . 4 4 e . . 4 4 e . . . 
                `,img`
                . . . . . 1 1 1 1 1 1 1 . . . 
                . . . . f f f f f f f f f . . 
                . . . 1 1 1 1 1 1 1 1 1 1 . . 
                . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                1 1 d e e 4 4 4 4 4 4 4 e 1 . 
                1 d d e e e e e e e e e e d . 
                1 1 . f e e e e 4 4 e e d . . 
                1 . . f f f e e e e e f . . . 
                . . f f f f f 5 d 1 5 f f d 4 
                . d d f f f 5 1 1 5 f f f d 4 
                . 4 4 f f 5 1 d 5 f f f . . . 
                . . . f f 5 1 5 f f f f . . . 
                . e b 4 . . . . . 4 4 e . . . 
                . . e . . . . . . . . . . . . 
                `],
            100,
            true
            )
        }
    } else {
        if (mainPlayerStyle == 0) {
            mySprite.setImage(img`
                . . . . f f f f f f f . . . . 
                . . . f f f f f f f f f . . . 
                . . f f f f f f f f f f f . . 
                . f f e e e e e e f f f f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . f e 4 f 4 4 4 f 4 e e f f . 
                . f e 4 4 4 4 4 4 4 4 e f f . 
                . f e 4 4 3 3 3 4 4 e e f f . 
                . f e e 4 4 4 4 4 e e f f f . 
                . . f e e e e e e f f f f f . 
                . f f f f f f f f f f f f f . 
                . f f f f f f f f f f f f f . 
                . c c f f f f f f c c f f f . 
                . 4 4 f f f f f f 4 4 f f . . 
                . . f f f f f f f f f f f . . 
                . . . e e c . . e e c . . . . 
                `)
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . . f f f f f f f . . . . 
                . . . f f f f f f f f f . . . 
                . . f f f f f f f f f f f . . 
                . f f f f f e e e e e e f f . 
                . f f f e e 4 4 4 4 4 e e f . 
                . f f e e 4 f 4 4 4 f 4 e f . 
                . f f e 4 4 4 4 4 4 4 4 e f . 
                . f f e e 4 4 3 3 3 4 4 e f . 
                . f f f e e 4 4 4 4 4 e e f . 
                . f f f f f e e e e e e f . . 
                . f f f f f f f f f f f f f . 
                . f f f f f f f f f f f f f . 
                . f f f c c f f f f f f c c . 
                . . f f 4 4 f f f f f f 4 4 . 
                . . f f f f f f f f f f f . . 
                . . . . c e e . . c e e . . . 
                `,img`
                . . . . . f f f f f f f . . . 
                . . . . f f f f f f f f f . . 
                . . . f f f f f f f f f f . . 
                . . f f f e e e e e e e f f . 
                . f f f e e 4 4 4 4 4 4 e f . 
                . f f f e 4 4 f 4 4 f 4 e f . 
                f f f f e 4 4 4 4 4 4 4 e f . 
                f f f f e 4 4 4 4 3 4 e e f . 
                f f . f e e e e e e e e f . . 
                f . . f f f f f f f f f . . . 
                . . c f f f f f f f f f c 4 . 
                . 4 4 f f f f f f f f f c 4 4 
                . . . f f f f f f f f f . . . 
                . . . f f f f f f f f f . . . 
                . e e c . . . . . c e e . . . 
                . . e . . . . . . . . . . . . 
                `],
            100,
            true
            )
        } else {
            animation.runImageAnimation(
            mySprite,
            [img`
                . . . . f f f f f f f . . . . 
                . . . f f f f f f f f f . . . 
                . . f f f f f f f f f f f . . 
                . f f f f 5 5 5 5 5 5 5 f f . 
                . f f f 5 5 4 4 5 4 4 5 5 f . 
                . f f 5 5 4 f 4 5 4 f 4 5 f . 
                . f f 5 5 4 4 5 5 5 4 4 5 f . 
                . f f 5 5 5 5 5 5 5 5 5 5 f . 
                . f f f e e 4 4 4 4 4 e e f . 
                . f f f f f e e e e e e f . . 
                . f f f f f f f f f f f f f . 
                . f f f f f f f f f f f f f . 
                . f f f c c f f f f f f c c . 
                . . f f 4 4 f f f f f f 4 4 . 
                . . f f f f f f f f f f f . . 
                . . . . c e e . . c e e . . . 
                `,img`
                . . . . . f f f f f f f . . . 
                . . . . f f f f f f f f f . . 
                . . . f f f f f f f f f f . . 
                . . f f f e 5 5 5 5 5 5 f f . 
                . f f f e 5 5 4 5 5 4 5 5 f . 
                . f f f e 5 4 f 5 5 f 4 5 f . 
                f f f f e 5 4 4 5 5 4 4 5 f . 
                f f f f e 5 5 5 5 5 5 5 5 f . 
                f f . f e e e e e e e e f . . 
                f . . f f f f f f f f f . . . 
                . . c f f f f f f f f f c 4 . 
                . 4 4 f f f f f f f f f c 4 4 
                . . . f f f f f f f f f . . . 
                . . . f f f f f f f f f . . . 
                . e e c . . . . . c e e . . . 
                . . e . . . . . . . . . . . . 
                `],
            100,
            true
            )
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Fireball, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.wall, function (sprite, otherSprite) {
    if (sprite.vx >= 0) {
        sprite.setVelocity(-10, 0)
    } else {
        sprite.setVelocity(10, 0)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.power, function (sprite, otherSprite) {
    info.changeLifeBy(2)
    mainPlayerStyle = 1
    sprites.destroy(otherSprite)
})
function startLevel () {
    tiles.placeOnRandomTile(mySprite, assets.tile`tile6`)
    for (let value of tiles.getTilesByType(assets.tile`tile6`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    scene.cameraFollowSprite(mySprite)
    info.setLife(1)
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        Coins = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 4 4 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . . f 5 5 4 4 5 5 5 5 5 f . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        Coins,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 4 4 4 4 4 5 5 5 f . . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 4 4 4 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 4 4 4 4 5 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 5 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(Coins, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
    }
    for (let value8 of tiles.getTilesByType(assets.tile`myTile1`)) {
        mysteryBox = sprites.create(img`
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            4 5 f 5 5 5 5 5 5 5 5 5 5 f 5 f 
            4 5 5 5 5 4 4 4 4 4 5 5 5 5 5 f 
            4 5 5 5 4 4 f f f 4 4 5 5 5 5 f 
            4 5 5 5 4 4 f 5 5 4 4 f 5 5 5 f 
            4 5 5 5 4 4 f 5 5 4 4 f 5 5 5 f 
            4 5 5 5 5 f f 5 4 4 4 f 5 5 5 f 
            4 5 5 5 5 5 5 4 4 f f f 5 5 5 f 
            4 5 5 5 5 5 5 4 4 f 5 5 5 5 5 f 
            4 5 5 5 5 5 5 5 f f 5 5 5 5 5 f 
            4 5 5 5 5 5 5 4 4 5 5 5 5 5 5 f 
            4 5 5 5 5 5 5 4 4 f 5 5 5 5 5 f 
            4 5 f 5 5 5 5 5 f f 5 5 5 f 5 f 
            4 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.mestryBlock)
        tiles.placeOnTile(mysteryBox, value8)
        tiles.setTileAt(value8, assets.tile`tile0`)
    }
    for (let value9 of tiles.getTilesByType(assets.tile`myTile4`)) {
        goomba = sprites.create(img`
            . . . . . . e e e e . . . . . . 
            . . . . . e e e e e e . . . . . 
            . . . . e e e e e e e e . . . . 
            . . . e e e e e e e e e e . . . 
            . . e f f e e e e e e f f e . . 
            . . e e 1 f e e e e f 1 e e . . 
            . e e e 1 f f f f f f 1 e e e . 
            e e e e 1 f 1 e e 1 f 1 e e e e 
            e e e e 1 1 1 e e 1 1 1 e e e e 
            e e e e e e e e e e e e e e e e 
            . e e e e d d d d d d e e e e . 
            . . . . d d d d d d d d . . . . 
            . . f f b b d d d d b b f f . . 
            . f f f f f b b b b f f f f f . 
            . f f f f f . . . . f f f f f . 
            . . f f f . . . . . . f f f . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(goomba, value9)
        tiles.setTileAt(value9, assets.tile`tile0`)
        goomba.setVelocity(-10, 0)
    }
    for (let value10 of tiles.getTilesByType(assets.tile`myTile5`)) {
        barrier = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            f . . . . . . . . . . . . . . f 
            `, SpriteKind.wall)
        tiles.placeOnTile(barrier, value10)
        tiles.setTileAt(value10, assets.tile`tile0`)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y < otherSprite.y) {
        info.changeScoreBy(1)
        sprites.destroy(otherSprite)
    } else {
        info.changeLifeBy(-1)
        pause(500)
    }
})
let barrier: Sprite = null
let goomba: Sprite = null
let Coins: Sprite = null
let Powers: Sprite = null
let mestryBlockLocation = 0
let mysteryBox: Sprite = null
let mestryBlockTileMapLocation: tiles.Location = null
let hitFromBottom = false
let direction = 0
let fire: Sprite = null
let mainPlayerStyle = 0
let mySprite: Sprite = null
let characterFit = 0
// من هنا يمكنك اختيار شكل الشخصية شب أو فتاة
// اختر 0 لشخصية الرجل -
// اختر 1 لشخصية المرأة -
// 
// From here change your character gender
// 
// - Choose 0 for a man
// - Choose 1 for a woman
characterFit = 0
// من هنا يمكنك اختيار شكل الشخصية شب أو فتاة
// اختر 0 لشخصية الرجل -
// اختر 1 لشخصية المرأة -
// 
// From here change your character gender
// 
// - Choose 0 for a man
// - Choose 1 for a woman
let background = 0
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 80, 0)
if (background == 0) {
    scene.setBackgroundImage(img`
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999119991111111199999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111911111111111999999999999999999999999999999999999999999999999999999
        999999999999111111199999999999999999999999999999999999999999999999999999999999999911111111111111111111111199999999999999999999999999999999999999999999999999999
        99999999911111111111999999999999999999999999999c999999999999999999999999999999999911111111111111111111111119999999999999999999999999999999999999999999999999999
        9999999111111111111919999999999999999999999f999f999999999999999999999999999999999911111111111111111111111119999999999999999999999999999999999999999999999999999
        999999111111111111199999999999999999999999ff99ff999999999999999999999999999999999911111111111111111111111199999999999999999999999999999999999999999999999999999
        999991111111111119999999999999999999999999f99ff9999999999999999999999999999999999911111111111111111111199999999999999999999999999999999991111119999999999999999
        99991111111199999999999999999999999999999ff99ff9999999999999999999999999999999999991111111111111199999999999999999999999999999999999999111111111999999999999999
        9991191119999999999999999999999999999999fff9fff9999999999999999999999999999999999999111111111999999999999999999999999999999999999999911111111111199999999999999
        9991119999999999999999999999999999999999fff9ff99999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111111111111119999999
        999999999999999999999999999999999999999cccccdd99999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111119999999
        999999999999999999999999999999999999999cccccdd99999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111111111111111199999999
        999999999999999999999999999999999999999cccccdd99999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111111199999999
        99999999999999999999999999999999999999ccccccdd99999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111111199999999
        99999999999999999999999999999999999999cccccdddd9999999999999999999999999999999999999999999999999999999999999999999999999999991111111111111111111111111199999999
        9999999999999999999999999999999999999ccccccddddd999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111111111111111199999999
        9999999999999999999999999999999999999ccccccddddb999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111111111999999999
        9999999999999999999999999999999999999cccdccdddb999999999999999999999999999f999919999999999999999999999999999999999999999999111111111111111111111111111999999999
        99999999999999999999999999999999999cccccdccddbb999999999999999999999999999f999911999999999999999999999999999999999999999999111111111111111111111111119999999999
        9999999999999999999999999999999999ccccccdcddbbb999999999999999999999999999ff99991999999999999999999999999999999999999999999111111111111111111111111199999999999
        9999999999999999999999999999999999ccccccdcddbbb9999999999999999999999999999f99991999999999999999999999999999999999999999999911111111111111111111119999999999999
        9999999999999999999999999999999999ccccccdcddbbb9999999999999999999999999999f99991199999999999999999999999999999999999999999991111111111111111999999999999999999
        9999999999999999999999999999999999cccccddcddbbb9999999999999999999999999999ff9991199999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb99999999999999999999999999999ff99ff199999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb999999999999999999999999999999fffff199999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb999999999999999999999999999999ffffff99999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddc1dbb999999999999999999999999999999ffffff19999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb99999999999999999999999999999cccccbf19999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb9999999999999999999999999999ccccccbbb9999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb9999999999999999999999999999ccccccbbb9999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddc1dbb9999999999999999999999999999cccccccbbb999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccddcddbb9999999999999999999999999999cccccccbbb999999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddc1ddb99999999999999999999999999999ccccccbbb999999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddcdddb99999999999999999999999999999ccccccbbb999999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddc1ddb99999999999999999999999999999ccccccbbb999999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddcd1db999999999999999999999999999999cccccbbbb99999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddc11db999999999999999999999999999999ccccccbcb99999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddcdddb999999999999999999999999999999ccccccbcbb9999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddc11db999999999999999999999999999999ccccccbcdb9999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddcdddb999999999999999999999999999999ccccccbcdbb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddcc1db999999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccddccdddb99999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999cccccccdddc1ddb99999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999ccccccccddc11db99999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999ccccccccddc11ddb9999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999ccccccccddc1ddbb9999999999999999999999999999ccccccbcdbb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999ccccccccddcc1ddb9999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999ccccccccddccdddb9999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999ccccccccdddc11db9999999999999999999999999999ccccccbcdbb999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccccddcd1ddb999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccccddcd1ddb999999999999999999999999999ccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccccddccd1db99999999999999999999999999cccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccccddcc11ddb9999999999999999999999999cccccccbcddb999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999ccccccccdddcc1dbb9999999999999999999999999cccccccbcddb99999999999999999999999999999999999cc99999999999999999999999999999999999
        999999999999999999999999999999999cccccccccddcc11db9999999999999999999999999cccccccbcddb99999999999cccccd99999999999999999cccd9999999999999999999999999999999999
        999999999999999999999999999999999bccccccccdddcd1bb9999999999999999999999999cccccccbdddb99999999999cccccdd999999999999999ccccdd999999999999999999999999999999999
        9999999999999999999999999999999999ccccccccdddc11db9999999999999999999999999ccccccbbdddb99999999999cccccddd9999999999999cccccddd99999999999999999999999999999999
        9999999999999999999999999999999999ccccccccdddcc11b999999999999999999999999cccccccbcddbb99999999999cfcccddd999999999999ccccc6dddd9999999999999999999999999999999
        9999999999999999999999999999999999ccccccccbddcc11b999999999999999999999999cccccccbcddb999999999999cdcccddd999999999999ccc66c6ddd9999999999999999999999999999999
        9999999999999999999999999999999999cccccccccdddcd1b999999999999999999999999cccccccbcddb999999999999cdcccddd999999999999cc6cccb66d9999999999999999999999999999999
        9999999999999999999999999999999999cccccccccdddcc1199999999999999999999999bccccccbcdddb999999999999cccccddd999999999999ccccc66ddd9999999999999999999999999999999
        9999999999999999999999999999999999cccccccccdddec1199999999999999999999999cccccccbcdddb999999999999cccccddd999999999999ccc66cd66d9999999999999999999999999999999
        9999999999999999999999999999999999bccccccccddddcd119999999999999999999999cccccccbcdddb999999999999cdcccddd999999999999cc6cccdddd9999999999999999999999999999999
        99999999999999999999999999999999999ccccccccddddcc11999999999999999999999bccccccbcdddbb999999999999cdcccddd999999999999ccccc66ddd9999999999999999999999999999999
        99999999999999999999999999999999999ccccccccdddddcdd199999999999999999999cccccccbcdddbb999999999999cccccddd999999999999ccc66cd66d9999999999999999999999999999999
        99999999999999999999999999999999999ccccccccdddddcc119999999999999999999bccccccbccdddbb999999999999cccccddd999999999999cc6cccdddd9999999999999999999999999999999
        99999999999999999999999999999999999ccccccccbdddddcd11999999999999999999cccccccbcddddbb999999999999cdcccddd999999999999ccccc66ddd9999999999999999999999999999999
        99999999999999999999999999999999999cccccccccdddddcc1199999999999999999bccccccbbcdddbbb999999999999cdcccddd999999999999ccc66cd66d9999999999999999999999999999999
        99999999999999999999999999999999999ccccccccbdddddcccc19999999999999999ccccccbbcddddbbb999999999999cccccddd999999999999cc6cccdddd9999999999999999999999999999999
        99999999999999999999999999999999999cccccccccddddddccc1119999999999999ccccccbbcdddddbb9999999999999cccccddd999999999999ccccc66ddd9999999999999999999999999999999
        99999999999999999999999999999999999cccccccccdddddddccc11999999999999ccccccbbbcddbdbbb9999999999999cdcccddd999999999999ccc66cd66d9999999999999999999999999999999
        9999999999999999999999999999999999bcccccccccdddddddcccc199999999999cccccccbbcdddddbbb9999999999999cdcccddd999999999999cc6cccdddd9999999999999999999999999999999
        99999999999999999999999999999999999cccccccccddddddddcccc19999999999ccccccbbcdddbbbbbb9999999999999cccccddd999999999999ccccc66ddd9c99999999999999999999999999999
        9999999999999999999999999999999999ccccccccccdddddddddccc119999999cccccccbbbdddbbbbbbb9999999999999cccccddd999999999999ccc66cd66d9cc9999999999999999999999999999
        9999999999999999999999999999999999ccccccccccdddddddddccc11199999cccbbbbbbdddddbbbbbbbb999999999999cdcccddd999999999999cc6cccdddd9ccc999999999999999999999999999
        999999999999999999999999999999999ccccccccccdddddddddddccc1119999ccdddddddddddbbbbbbbbb99999d999999cdcccddd999999999999ccccc66ddd9cccc99999999999999999999999999
        999999999999999999999999999999999ccccccccccddddddddddddcccc119cccdddddddddddbbbbbbbbbb9999dd999999cccccddd9999999999e9ccc66cd66d9ccccc9999999999999999999999999
        99999999999999999999999999999999cccccccccccdddddddddddddcccc1cccddddddddddbbbbbbbbbbbbb99ddd999999cccccddd99999999dde9cc6cccdddd9c66ccc999999999999999999999999
        9999999999999999999999999999999ccccccccccccddddddddddddddccccccdddddddddbbbbbbbbbbbbbbb9dd6d999999cdcccddd9999999ddde9ccccc66ddd9cccccc999999999999999999999999
        9999999999999999999999999999999cccccccccccdddddddddddddddcccccddddddbbbbbbbbbbbbbbbbbbbbdddd999999cdcccddd999999dddde9ccc66cd66d9ccc66c999999999999999999999999
        9999999999999999999999999999ccccccccccccccdddddddddddddddcccccdddddbbbbbbbbbbbbbbbbbbbbbdd6d999999cccccddd999999dd6de9cc6cccdddd9cccccc999999999999999999999999
        99999999999999999999c99999ccccccccccccccccddddddddddddddcccccdddddbbbbbbbbbbbbbbbbbbbbbbbddd999999cccccddd999999dd6de9ccccc66ddd9c66ccc999999999999999999999999
        99999999999c9999999cc99999cccccccccccccccdddddddddddddddcccccddddbbbbbbbbbbbbbbbbbbbbbbbbbdd999999cdcccddd999999dddde9ccc66cd66d9cccccc999999999999999999999999
        9999999999ccc99999ccc999ccccccccccccccccdddddddddddddddcccccddddbbbbbbbbbbbbbbbbbbbbbbbbbbbb999999cdcccddd999bb9dd6de9cc6cccdddd9ccc66c999999999999999999999999
        999999999ccccc999cccc99cccccccccccccccdddddddddddddddddcccccddddbb1111111111bbbbbbbbbbbbbbbbb99999cccccddd9bbbbbdd6de9ccccc66ddd9cccccc999999999999999999999999
        999999999ccccc999cccc99cccccccccccdddddddddddddddddddddcccccddddb111111111111bbbbbbbbbbbbbbbbb9999cccccddd9b6b6bdddde9ccc66cd66d9c66ccc999999bbbbbbbbbbbbbbbbb9
        999999999ccccc999cccc99ccccccccdddddddddddddddddddddddcccccdddd111111666661111bbbbbbbbbbbbbbbbb999c7cccddd9bbbbbdd6de9cc6cccdddd9cccccc9bbbbbbbbbbbbbbbbbbbbbbb
        699969999ccccc999cccc99cccccddddddddddddddddddddddddddcccccdddd111166666666111bbbbbbbbbbbbbbbbb999c77ccddd9b6b6bdd6de9ccc7ccdddd9ccc66c9bb666bb6667b666bb6667b6
        6699e6996ccccc999cccc99dddddddddddddddddddddddddddddddcccccdddd1116666666661111bbbbbbbbbbbbbbbbb997777cddd9b77bbdddde9c7777cdddd9cccccc9bb666bb67777776bb667776
        6e6966696ccccccccccc799ddddddddddddddddddddddddddddddcccccdddd11166666666666111bbbbbbbbbbbbbbbbb9777777ddd97777bdd6de9c77777dddd9c66ccc9bbbbbbb77777777bbb77777
        66696e69e7ccccccccc7779ddddddddddddddddddddddddddddddcccccdddd11166666666666111bbbbbbbbbbbbbbbbb77777777dd97777bdd6def77777777dd9cccccc9cccccc777777777c7777777
        6e676669777ccccccc77777ddddddddddddddddddddddddddddddcccccdddd11166666666666611bbbbbbbbbbbbbbbb7777777777d777777dddde777777777dd9ccc66c9cccccc77777777777777777
        66777e677777c7cccc777777dddddddddddddddddddddddddddddcccccdddd111666666666666111bbbbbbbbbbbbbb77777ee777777777777d6decccceccdddd9cccccc9cc66cc66cce6cc66cc66ec6
        666e66696ecc777cc777e777dddddddddddddddddddddddddddddcccccdddd111666666666666611bbbbbbbbbbbbbbbb99ceeccddd9bebbbdd6decccceccdddd9c66ccc9cc66cc66cce6cc66cc66ec6
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888811888888888888888888888888888888888188888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888811888888888888888888888888888888881118888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888118188888888888888888888888888888811111888888888888888888888888888888888888888
        888888888888888888888888888881888888888888888888888888888888888888888888888888888111188888888888888888888888888888111111888888888888888888888888888888888888888
        888888888888888888888888111111888888888888888888888888888888888888888888888888881111188888888888888888888888888888181118888888888888888888888888888888888888888
        888888888888888888888888181118888888888888888888888888888888888888888888888888811111188888888888888888888888888881111188888888888888888888888888888888888888888
        888888888888888888888881811188888888888888888888888888888888888888888888888888111111888888888888888888888888888881111188888888888888888888888888888888888888888
        888888888888888888888881111888888888888888888888888888888888888888888888888888111118888888888888888888888888888811111888888888888888888888888888888888888888888
        888888888888888888888811111888888888888888888888888888888888888888888888888888181188888888888888888888888888888811811888888888888888888888888888888888888888888
        888888888888888888888811111888888888888888888888888888888888888888888888888881111888888888888888888888888888888811118888888888888888888888888888888888888888888
        888888888888888888888111118888888888888888888888888888888888888888888888888881111888888888888888888888888888888811188888888888888888888888888888888888888888888
        888888888888888888888818118888888888888888888888888888888888888888888888888881188888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888818188888888888888888888888888888888888888888888888888881888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888881888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        `)
} else {
    scene.setBackgroundImage(img`
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999911119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999999111119999999999999999999999999999999999999999999999111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999991111119999999999999999999999999999999999999999999991111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        999999999991111119111119999999999999999999999999999999991111111111111199999999999999999999999999999999999999999999999111119999999999999999999999999999999999999
        999999999991111111111119999999999999999999999999999999991111111111111199999999999999999999999999999999999999999999111111119999999999999999999999999999999999999
        999999111111111111111119999999999999999999999999999991111111111111111111111199999999999999999999999999999999999999111111111999999999999999999999999999999999999
        999991111111111111111111111999999999999999999999999991111111111111111111111199999999999999999999999999999999999999111111111999999999999999999999999999999999999
        999991111111111111111111111119999999999999999999999991111111111111111111111199999999999999999999999999999999999999111111111111119999999999999999999999999999999
        999991111111111111111111111119999999999999999999999991111111111111111111111199999999999999999999999999999999991111111111111111119999999999999999999999999999999
        999991111111111111111111111119999999999999999999999999911111111111111111111999999999999999999999999999999999991111111111111111111119999999999999999999999999999
        999999111111111111111111111199999999999999999999999999999999111111111111119999999999999999999999999999999999991111111111111111111111199999999999999999999999999
        999999999911111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111111111111111199999999999999999999999999
        999999999911111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111199999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111199999999999999999999999999
        999999999999999999999999999999999999999999999999999999999999999999999999996666699999996666699999999999999999999999999999999999999999999999999999999999999999999
        99999999999999999999999999999999999999999999999999999996699999999999999996666cb6999966cccc699999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999996cc69999999999999996666cbb9999ccbbbc69999999999999999999999999999999999999999999999999999f9f9999999999999
        9999999999999999999999999999999999999999999999999999996cc69999999999999996666cbb69966cbbbc6999999999999999999999999999999999999999999999999999f9f9f999999999999
        99999999999999999999999999999999ff99999999999966699996cccc6699999999999996666cbbb6666cbbbc699999999999999999999999999999999999999999999999999f99f99f99999999999
        9999999999999999999999999999999f99f9999999999966666666ccccc699999999999996666cbbb6666cbbbc699999999999999999999999999999999999999999999999999999999999999999999
        999999999999999999999999999999999f9f99999999996666666cccccc699999999999996666cbbbb666cbbbc6999999dd999999999999999999999999999999999999999999999999999999999999
        999999999999999999999b9999999999999f99999999996666666cccccc699999999999996666cbbbb666cbbbc6999999dd999999999999999999999999999999999999999999999999999999999999
        999999999999999999999b999999999999f99999999999666666ccccccc699999999999996666cbbb6666cbbbc6999999dd999999999999999999999999999999999999999999999999999999999999
        999999999999999999999b99999999999999999999999966666cccccccc699999999999996666cbbb6666cbbbc6999999dd999999999999999999999999999999999999999999999999999999999999
        999999999999999999999b999999999999999999999999666cccccccccc699999999999996666cbb66c66cbbbc6999999dd999999999999999999999999999999999999999999999999999999999999
        999999999999999999999b999999999999999999666666666666ccccccc699999999999996666cbb66cc6cbbbc6999999bb999999999999999999999999999999999999999999999999999999999999
        999999999999999999999b9999999999999999966cccccccccc66cccccc699999999999996666cb666cbcbbbbc699999bbbb99999999999999999999999999999999999999999999999999999999999
        99999999999999999999bbb9999999999999999666666666666666ccccc699999999999996666cb666cbbbbbbc69999bbbbbb9999999999999999999999999999999999999999999999999999999999
        9999999999999999999bb6b9999999999999999966ccccccc666cc6cccc69999999999999666cbb666cccbbbbc6999bbbbbbbb999999999999999999999999999999999999999999999999999999999
        9999999999999999bbbb66bb999999999999999996666666666ccc6cccc699999999999996cbbb66cb666cbbbc699bbbbbbbbbb99999999999999b666666b666666b999999999999999999999999999
        99999999999bbbbb66bbbb6b999999999999999996cccccccccccc6cccc699999999999996cbbb66cb666cbbbc699bbddddddbb999999999999966b6666b6b6666b6699999999999999999999999999
        9999999999bbb66666bbbbbc9999999999999999999cccccccccccc6ccc699999999999996cbbb66cb666cbbbc69bbbddddddbbb99999999999966b666b666b666b6699999999999dd9999999999999
        999999999b66bbbbbbbbbbbc9999999999999999999ccc66666cccc6ccc699999999999996cbbb66cb666cbbbc69bbbbbbbbbbbb999999999999666b66b666b66b6669999999999dddb999999999999
        99999999b66bbb6666666b6c9999999999999999999ccc66666cccc6ccc699999999999996cbbb66cb666cbbbc6bbddddbbddddbb99999999999666b6b66666b6b666999999999ddddd999999999999
        99999999b66bbb666666bbbc9999999999cc9999999ccccccc6cccc6ccc699999999999996cbbb66cb666cbbbc6bbddddbbddddbb99999999999bb6b6b66666b6b6bb999999999dddddb99999999999
        99999999b66bbb666666bbbc99999966666c9999999ccccccc6cccc6ccc699999999999996cbbb66cb666cbbbc6bddddbbbbddddb9999999999966b6b6666666b6b669999999dddddddcb9999999999
        99999999b6666666666bbbbc999cccc6666c9999999ccc66666cccc6ccc699999999999996cbbb66cb666cbbbc6bddddbbbbddddb999999999996666b6666666b66669999996dddddddcc9999999999
        999999999bb666666bbbbbc69cccccc6666c9999999ccc66666cccc6ccc699999999999996cbbb66cb666cbbbbcbddddbbbbddddbb99999999999b6b6b66666b6b6b9999996cddddcddcc9999999999
        9999999999b66bbbbbbbbbc99cccccc6666c9999999ccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcbbddbbbbbbddbbb999999999996b66b66666b66b6999999ccdddccdcccb999999999
        9999999999bbb6666bbbbbc99cccccc6666c9999999ccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b666b666b666b699999dddddcccddddcb99999999
        9999999999b66666bbbbbbc99ccc6666666c9999999ccc66666cccc6ccc699999999999996cbbb66cb666cbbbbcbbbbbbbbbbbbbbb99999999999b6666b666b6666b99999dddddcccddddcb99999999
        9999999999b66666bbbbbc999ccc6666c66c9999999ccc66666cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbddddbb999999999996b6666b6b6666b699999dddddccdddddcb99999999
        99999999996b6666bbbbbc699cccccc6666c9966666ccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbddddbb999999999996b66666b66666b699999dbdd666dddddcb99999999
        99999999999b6666bbbbbc699cccccc6666c99666ccccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcbbbbbbbbbbbbbbb99999999999b6b666b6b666b6b99999dcd6666ddbbdcb96669999
        99999999999b6666bbbbbc69ccccccc6666c99666ccc6666666ccc6cccc699999999999996cbbb66cb666cbbbbcbbbbbbbbbbbbbbb99999999999666b6b666b6b66699999dcd6666ddbbdcbcccc9999
        99999999999b6666bbbbbc69ccc66666666c99666ccc6666666ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999666b6b666b6b66699996bcd6666ddbbdcbcccc9999
        99999999999b6666bbbbbc69ccc66666666c99666ccccccccc6ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999bb66b66666b66bb99996bcd6666dddddcbcccc9999
        99999999999b6666bbbbbc69ccccccc6666c99666ccccccccc6ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb9999999999966b6b66666b6b6699996bcd6666ddbbdcbcccc9999
        99999999999bb666bbbcc699ccccccc6c66c99666ccc6666666ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999666b6666666b66699996bcd6666ddbbdcbcccc9999
        99999999999bb666bbbcc699ccccccc6666c99666ccc6666666ccc66ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999666b6666666b66699996bcd6666ddbbdcbcccc9999
        99999999999bb666bbbcc699ccc66666666c99666ccccccccc6ccc66ccc699999999999996cbbb66cb666cbbbbcbdddbbbbbbdddbb999999999996bb6b66666b6bb6999dbdcd6666dddddcbcccc9999
        99999999999bb666bbbcc699ccc66666666c99666ccccccccc6ccc66ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999b6b6b66666b6b6b999dddcd666ddddddcbcccc9999
        99999999999bb666bbbcc699ccccccc6666c99666ccc6666666cccc6ccc699999999999996cbbb66cb666cbbbbcbdddbbbbbbdddbb9999999999966b66b666b66b66999dbdcdd66dcdbbdcbcccc9999
        99999999999bb666bbbcc699ccccccc6666c99666ccc6666666cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b666b666b666b6999dbbcdd66dcdbbdcbcccc9999
        99999999999bb666bbbcc699ccccccc6666c99666ccccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcbbbbbbbbbbbbbbb999999999996b6666b6b6666b6999dddcdd66dbdbbdcbcccc9999
        999999999999b666bbbcc699ccc66666c66c99666ccccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999b666666b666666b999dddcdd66ddddddcbcccc9999
        999999999999bb66bbbcc699ccc6666666cc99666ccc6666666cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b6666b6b6666b6999dddcdd66ddddddcbcccc9999
        999999999999b666bbbcc699ccccccc666c999666ccc6666666cccc6ccc699999999999996cbbb66cb666cbbbbcbbbbbbbbbbbbbbb999999999996b666b666b666b6999dddcdd66ddddddcbcccc9999
        999999999999bb66bbbcc699ccccccc666c999666ccccccccc6cccc6ccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb9999999999966b66b666b66b66999dbdcdd66dcdbbdcbcccc9999
        999999999999b666bbbcc699ccccccc666c999666ccccccccc6ccc66ccc699999999999996cbbb66cb666cbbbbcbddddbbbbddddbb9999999999966b6b66666b6b66999dddcdd66ddddddcbcccc9999
        999999999999b666bbbcc699ccc6666666c999666ccc6666666ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999b6b6b66666b6b6b999dbdcdd66dcdbbdcbcccc9999
        99999dddddddbb66bbbcc699ccc6666666c999666ccc6666666ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b6b6666666b6b6999dddcdd66dbddddcbcccc9999
        9999ddddddde9b66bbbcc699ccccccc666c999666ccccccccc6ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b6b6666666b6b6999dddcdd66dbdbbdcbcccc9999
        999dddddddde9b66bbbcc699ccccccc666c999666ccccccccc6ccc6cccc699999999999996cbbb66cb666cbbbbcdddddbbbbdddddb99999999999b6b6b66666b6b6b999dddcdd66dbdbbdcbcccc9999
        99ddddddddde9b66bbbcc699ccccccc6c6c999666ccc6666666ccc6cccc699ddddddddddd6cbbb66cb666cbbbbcdddddbbbbdddddb9999999999966b6b66666b6b66999dbdcdd66dbdbbdcbcccc9999
        ddddddddddde9b66bbbcc699ccc6666666c999666ccc6666666ccc66ccc699ddddddddddd6cbbb66cb666cbbbbcdddddbbbbdddddb9999999999966b66b666b66b66999dddcdd66dbddddcbcccc9999
        ddd6d6d6ddde9b66bbbcc699ccc6666666c999666ccccccccc6ccc66ccc699ddddccddccd6cbbb66cb666cbbbbcbbbbbbbbbbbbbbb999999999996b666b666b666b6999dddcdd66dbdbbdcbcccc9999
        ddddddddddde9b66bbbcc699ccccccc666c999666ccccccccc6cccc6ccc699ddccccddccc6666666cb666cbbbbcdddddbbbbdddddb999999999996b6666b6b6666b6999dbbcd6666cdbbdcbcccc9999
        d6d6d6d6d6de9b66bbbcc699ccccccc666c999666ccc6666666cccc6ccc699ddccccddccc6cbbb66cb666cbbbbcbdddbbbbbbdddbb99999999999b666666b666666b999dddcd6666dddddcbcccc9999
        ddddddddddde9b666bbcc699ccccccc666c999666ccc6666666cccc6ccc699ddddddddddd6cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b6666b6b6666b6999dddcd6666dddddcbcccc9999
        d6d6d6d6d6de9b666bbcc699ccc6666666c999666ccccccccc6cccc6ccc699ddddddddddd6cbbb66cb666cbbbbcbbbbbbbbbbbbbbb999999999996b666b666b666b6999dbbcd6666cdbbdcbcccc9999
        ddddddddddde9bb66bbcc699ccc6666666c999666ccccccccc6cccc6ccc699ddddddddddd6cbbb66cb666cbbbbcdddddbbbbdddddb9999999999966b66b666b66b66999dbbcd6666cdebdcbcccc9999
        ddddddddddde99bbbbbcc699ccccccc666c999666ccc6666666ccc66ccc699ddccccddccc6cbbb66cb666cbbbbcdddddbbbbdddddb9999999999966b6b66666b6b66999dddcd6666dddddcbcccc9999
        d6d6d6d6d6de9dbbbbbcc699ccccccc666c999666ccc6666666ccc66ccc699ddccccddccc6666666cb666cbbbbcbdbbbbbbbbbbdbb99999999999b6b6b66666b6b6b999dbdcd6666cdbbdcbccccddcc
        d6d6d6d6d6de9dbbbbbcc699ccccccc6c6c999666ccccccccc6ccc66ccc699ddccccddccc6cbbb66cb666cbbbbcdddddbbbbdddddb999999999996b6b6666666b6b6999dddcd6666dddddcbccccddcc
        ddddddddddde9dbbbbbcc699ccc6666666c999666ccccccccc6ccc66ccc699ddccccddccc6cbbb66cb666cbbbbcdddddbbbbdddddbdddddbbbbb96b6b6666666b6b6999dbdcd6666bdbbdcbccccddcc
        dddd666dddde9dbbbbbcc699ccc6666666c999666ccc6666666ccc66ccc699ddddddddddd6cbbb66cb666cbbbbcdddddbbbbdddddbdddddddddb9b6b6b66666b6b6b999dddcd6666dddddcbccccddcc
        ddd66666ddde9dbbbbbcc699ccccccc666c999666ccc6666666ccc66ccc699ddddddddddd6cbbb66cb666cbbbbcdddddbbbbdddddbdddddddddb966b6b66666b6b66999dddcd6666bdbddcbccccddcc
        ddd66666ddde9dbbbbbcc699ccccccc666c999666ccccccccc6ccc66ccc699ddccccccccd6cbbb66cb666cbbbbcdddddbbbbdddddbddbbdbbbdb966b66b666b66b66999dbdcd6666bdbbdcbccccddcc
        ddd66666ddde9dbbbbbccbddccccccc666c999666ccccccccc6cc6ccccc699ddccccccccd6666666cb666cbbbbcdddddbbbbdddddbdddddddddb66b666b666b666b6699dbdcd6666bdbbdcbccccddcc
        ddd66666ddde9dbbbbbccbddccc6666666c999666ccc6666666cc6ccccc696ddccccccccd6cbbb66cb666cbbbbcdddddbbbbdddddbddbddbbbdbb6b6666b6b6666b6b99dddcd6666bddddcbccccddcc
        ddd66666ddde9dbbbbbcccddccc6666666c999666ccc6666666cc6ccccc696ddccccccccd6cbbb6666666cbbbbcbddddbbbbddddbbddbbdbbbdb6b666666b666666b699dbdcd6666bdbbdcbccccddcc
        ddd66666ddde9dbbbbbcccbdccccccc666c999666ccccccccc6cccccccc696ddccccccccd6cbbb6666666bbbbbcbbbbbbbbbbbbbbbddbbdbbbdb6b66666b6b66666b699dbbcd6666cdbbdcbccccddcc
        dd66ddd66dde9dbbbbbcccbdccccccc666c666666ccccccccc6cccccccc666ddddddddddd6cb666666666666bcbdddddbbbbdddddbdddddddddbb666666b6b666666b99dbbcd6666cdbbdcbccccddcc
        dd66d6d66dde9dbbbbbcccbcccccccc6c6cbb6666ccc6666666cccccc66ccc6dccccccccc6cb666666666666bbbbbbbbbbbbbbbbbbddbbdbbbdb6b6666b666b6666b699dddcd6666dddddcbccccddcc
        dd66d6d66dde9dbbbbbcccbcccc6666666cbb6666ccc6666666ccccc6cccccc66cccccccc66666666666666666bdddddbbbbdddddbdddddddddb6b6666b666b6666b699dddcd6666dddddcbccccddcc
        dd66ddd66dde9dbbbbbcccbcccc6666666cbb6666ccccccccc6ccccc6cc666ccc6ddddddd66666666666666666bbbbbbbbbbbbbbbbddbbdbbbdb66b66b66666b66b66dddddcd6666bdbbdcbccccddcc
        d666ddd66dde9dbbbbbcccbcccccccc666c666666ccccccccc6cccc66c6ccc6cc6ddddddd66666666666666666bdddddbbbbdddddbdddddddddb66b66b66666b66b66dddbbcd6666cdbbdcbccccddcc
        d66ddddd66de9dbbbbbcccbcccccccc666cbb6666ccc6666666cccc6ccccccccc6ccccccc66666666666666666bbbbbbbbbbbbbbbbddbbdbbbbb6b6b6b66666b6b6b6dddddcd6666dddddcbccccddcc
        d66d6d6d66de9dbbbbccccbccccc666666c66b666ccc6666666cccc6ccccccccc6ddddddd66666666666666666bbddddbbbbddddbbddbddbbddbb66b6b66666b6b66bdddddbdd66d4444ecbccccddcc
        d66ddddd66de9dbbbbccccbccccc666666cbb6666cccccccccccccc6c66666ccccddddddd66fffffffffffff66bdddddbbbbdddddbdddddddddb6b6b6b66666b6b6bbdbddddddddd4bbbbcbccccddcc
        d66d6d6d66de9dbbbbcccccbccccccc666c666666cccccccccccccc6cccccc66ccddddddd6f6666666666666f6bdddddbbbbdddddbdddddddddb66b6b6666666b6b6bdbbbbddddddbceebcbccccddcc
        d66ddddd66de9dbbbbbccccbccccccc666cbbb666ccccccccccccc664444ccc6ccdddddddf666666666666666fbdddddbbbbdddddbdbbbdbbbbb6b66b6666666b66bdddddddddddddcccccbccccddcc
        d66d6d6d66de9bbbb6cccc6bccccccc666cbbb666cccccccccccc66888884cccccddddddd66666666666666666bbbbbbbbbbbbbbbbdbbbdbbbbbb6666bb666bb666bbdbdbbdddbbdbebebebccccddcc
        dddddddddddbbbccbbcccccbbbbbbbbbbbcbbb66666666666666664eeeee4ecccfddddddd66666666666666666bbbbbbbbbbbbbbbbdbbbdbbbbb6666666b6b66666bbdbdbbdddbbdbeeebebccccddcc
        ddddddddddddddbbddbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbdddddddddd4bbbbbbbbbbbbbbbbbbbbbbbbbbbdddddddddddddddddddddddddbbbbbbbbbbbbbbbb6dddddddddddddddddddbbbbdddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd6dddddddddddddddddddddddddd
        ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        `)
}
// من هنا يمكنك تصميم المرحلة الخاصة بك بالضغط على المربع الرمادي
// 
// You can design your own level by clicking on the gray box
tiles.setTilemap(tilemap`level`)
startLevel()
game.onUpdate(function () {
    if (characterFit == 0) {
        if (mySprite.vy != 0) {
            if (direction == 0) {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . . . 1 1 1 1 1 1 1 . . . 
                        . . . . f f f f f f f f f . . 
                        . . . 1 1 1 1 1 1 1 1 1 1 . . 
                        . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                        . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                        . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                        1 1 d e e 4 4 4 4 4 4 4 e 1 . 
                        1 d d e e e e e e e e e e d . 
                        1 1 . 1 e e e e 4 4 e e d . . 
                        1 . . 1 1 1 e e e e e 1 . . . 
                        . . 1 1 1 1 1 1 d 1 1 1 d 4 . 
                        . 4 4 1 1 1 1 1 1 1 1 1 d 4 4 
                        . . . 1 1 1 1 d 1 1 1 1 . . . 
                        . . . 1 1 1 1 1 1 1 d d . . . 
                        . e b 4 . . . . . 4 4 e . . . 
                        . . e . . . . . . . . . . . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . . . 1 1 1 1 1 1 1 . . . 
                        . . . . f f f f f f f f f . . 
                        . . . 1 1 1 1 1 1 1 1 1 1 . . 
                        . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                        . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                        . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                        1 1 d e e 4 4 4 4 4 4 4 e 1 . 
                        1 d d e e e e e e e e e e d . 
                        1 1 . f e e e e 4 4 e e d . . 
                        1 . . f f f f e e e e f . . . 
                        . . f f f f f 5 d 1 5 f f d 4 
                        . d d f f f 5 1 1 5 f f f d 4 
                        . 4 4 f f 5 1 d 5 f f f . . . 
                        . . . f f 5 1 5 f f f f . . . 
                        . e b 4 . . . . . 4 4 e . . . 
                        . . e . . . . . . . . . . . . 
                        `)
                }
            } else {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . 1 1 1 1 1 1 1 . . . . . 
                        . . f f f f f f f f f . . . . 
                        . . 1 1 1 1 1 1 1 1 1 1 . . . 
                        . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                        . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                        . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                        . 1 e 4 4 4 4 4 4 4 e e d 1 1 
                        . d e e e e e e e e e e d d 1 
                        . . d e e 4 4 e e e e 1 . 1 1 
                        . . . 1 e e e e e 1 1 1 . . 1 
                        . 4 d 1 1 1 d 1 1 1 1 1 1 . . 
                        4 4 d 1 1 1 1 1 1 1 1 1 4 4 . 
                        . . . 1 1 1 1 d 1 1 1 1 . . . 
                        . . . d d 1 1 1 1 1 1 1 . . . 
                        . . . e 4 4 . . . . . 4 b e . 
                        . . . . . . . . . . . . e . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . 1 1 1 1 1 1 1 . . . . . 
                        . . f f f f f f f f f . . . . 
                        . . 1 1 1 1 1 1 1 1 1 1 . . . 
                        . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                        . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                        . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                        . 1 e 4 4 4 4 4 4 4 e e d 1 1 
                        . d e e e e e e e e e e d d 1 
                        . . d e e 4 4 e e e e f . 1 1 
                        . . . f e e e e f f f f . . 1 
                        4 d f f 5 1 d 5 f f f f f . . 
                        4 d f f f 5 1 1 5 f f f d d . 
                        . . . f f f 5 d 1 5 f f 4 4 . 
                        . . . f f f f 5 1 5 f f . . . 
                        . . . e 4 4 . . . . . 4 b e . 
                        . . . . . . . . . . . . e . . 
                        `)
                }
            }
        } else if (mySprite.vx == 0) {
            if (direction == 0) {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . . . 1 1 1 1 1 1 1 . . . 
                        . . . . f f f f f f f f f . . 
                        . . . 1 1 1 1 1 1 1 1 1 1 . . 
                        . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                        . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                        . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                        . 1 d e e 4 4 4 4 4 4 4 e 1 . 
                        . 1 d e e e e e e e e e e d . 
                        . 1 d 1 e e e e 4 4 e e d . . 
                        . 1 d d d 1 e e e e e 1 . . . 
                        1 d 1 1 d 1 1 1 1 1 1 1 d . . 
                        . 4 1 1 d 1 1 1 d 1 1 1 d d . 
                        . 4 4 1 1 1 1 1 1 1 1 1 4 4 . 
                        . 4 4 1 1 1 1 1 d 1 1 1 4 4 . 
                        . . . 1 1 1 1 1 1 1 1 1 . . . 
                        . . . . 4 4 e . . 4 4 e . . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . . . 1 1 1 1 1 1 1 . . . 
                        . . . . f f f f f f f f f . . 
                        . . . 1 1 1 1 1 1 1 1 1 1 . . 
                        . . 1 1 d 4 4 4 4 4 4 4 1 1 . 
                        . 1 1 d 4 4 4 4 4 4 4 4 4 1 . 
                        . 1 d d e 4 1 f 4 1 f 4 4 1 . 
                        . 1 d e e 4 4 4 4 4 4 4 e 1 . 
                        . 1 d e e e e e e e e e e d . 
                        . 1 d f e e e e 4 4 e e d . . 
                        . 1 d d d f e e e e e f . . . 
                        1 d f f d f f 5 1 5 f f d . . 
                        . 4 f f d f f 5 d 5 f f d d . 
                        . 4 4 f f f f 5 1 5 f f 4 4 . 
                        . 4 4 f f f f 5 d 5 f f 4 4 . 
                        . . . f f f f 5 1 5 f f . . . 
                        . . . . 4 4 e . . 4 4 e . . . 
                        `)
                }
            } else {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . 1 1 1 1 1 1 1 . . . . . 
                        . . f f f f f f f f f . . . . 
                        . . 1 1 1 1 1 1 1 1 1 1 . . . 
                        . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                        . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                        . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                        . 1 e 4 4 4 4 4 4 4 e e d 1 . 
                        . d e e e e e e e e e e d 1 . 
                        . . d e e 4 4 e e e e 1 d 1 . 
                        . . . 1 e e e e e 1 d d d 1 . 
                        . . d 1 1 1 1 1 1 1 d 1 1 d 1 
                        . d d 1 1 1 d 1 1 1 d 1 1 4 . 
                        . 4 4 1 1 1 1 1 1 1 1 1 4 4 . 
                        . 4 4 1 1 1 d 1 1 1 1 1 4 4 . 
                        . . . 1 1 1 1 1 1 1 1 1 . . . 
                        . . . e 4 4 . . e 4 4 . . . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . 1 1 1 1 1 1 1 . . . . . 
                        . . f f f f f f f f f . . . . 
                        . . 1 1 1 1 1 1 1 1 1 1 . . . 
                        . 1 1 4 4 4 4 4 4 4 d 1 1 . . 
                        . 1 4 4 4 4 4 4 4 4 4 d 1 1 . 
                        . 1 4 4 f 1 4 f 1 4 e d d 1 . 
                        . 1 e 4 4 4 4 4 4 4 e e d 1 . 
                        . d e e e e e e e e e e d 1 . 
                        . . d e e 4 4 e e e e f d 1 . 
                        . . . f e e e e e f d d d 1 . 
                        . . d f f 5 1 5 f f d f f d 1 
                        . d d f f 5 d 5 f f d f f 4 . 
                        . 4 4 f f 5 1 5 f f f f 4 4 . 
                        . 4 4 f f 5 d 5 f f f f 4 4 . 
                        . . . f f 5 1 5 f f f f . . . 
                        . . . e 4 4 . . e 4 4 . . . . 
                        `)
                }
            }
        } else {
        	
        }
    } else {
        if (mySprite.vy != 0) {
            if (direction == 0) {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . . . f f f f f f f . . . 
                        . . . . f f f f f f f f f . . 
                        . . . f f f f f f f f f f . . 
                        . . f f f e e e e e e e f f . 
                        . f f f e e 4 4 4 4 4 4 e f . 
                        . f f f e 4 4 f 4 4 f 4 e f . 
                        f f f f e 4 4 4 4 4 4 4 e f . 
                        f f f f e 4 4 4 4 3 4 e e d . 
                        f f . f e e e e e e e e d . . 
                        f . . f f f f f f f f f . . . 
                        . . c f f f f f f f f f c 4 . 
                        . 4 4 f f f f f f f f f c 4 4 
                        . . . f f f f f f f f f . . . 
                        . . . f f f f f f f f f . . . 
                        . e e c . . . . . c e e . . . 
                        . . e . . . . . . . . . . . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . . . f f f f f f f . . . 
                        . . . . f f f f f f f f f . . 
                        . . . f f f f f f f f f f . . 
                        . . f f f e 5 5 5 5 5 5 f f . 
                        . f f f e 5 5 4 5 5 4 5 5 f . 
                        . f f f e 5 4 f 5 5 f 4 5 f . 
                        f f f f e 5 4 4 5 5 4 4 5 f . 
                        f f f f e 5 5 5 5 5 5 5 5 f . 
                        f f . f e e e e e e e e f . . 
                        f . . f f f f f f f f f . . . 
                        . . c f f f f f f f f f c 4 . 
                        . 4 4 f f f f f f f f f c 4 4 
                        . . . f f f f f f f f f . . . 
                        . . . f f f f f f f f f . . . 
                        . e e c . . . . . c e e . . . 
                        . . e . . . . . . . . . . . . 
                        `)
                }
            } else {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . f f f f f f f . . . . . 
                        . . f f f f f f f f f . . . . 
                        . . f f f f f f f f f f . . . 
                        . f f e e e e e e e f f f . . 
                        . f e 4 4 4 4 4 4 e e f f f . 
                        . f e 4 f 4 4 f 4 4 e f f f . 
                        . f e 4 4 4 4 4 4 4 e f f f f 
                        . d e e 4 3 4 4 4 4 e f f f f 
                        . . d e e e e e e e e f . f f 
                        . . . f f f f f f f f f . . f 
                        . 4 c f f f f f f f f f c . . 
                        4 4 c f f f f f f f f f 4 4 . 
                        . . . f f f f f f f f f . . . 
                        . . . f f f f f f f f f . . . 
                        . . . e e c . . . . . c e e . 
                        . . . . . . . . . . . . e . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . f f f f f f f . . . . . 
                        . . f f f f f f f f f . . . . 
                        . . f f f f f f f f f f . . . 
                        . f f 5 5 5 5 5 5 e f f f . . 
                        . f 5 5 4 5 5 4 5 5 e f f f . 
                        . f 5 4 f 5 5 f 4 5 e f f f . 
                        . f 5 4 4 5 5 4 4 5 e f f f f 
                        . f 5 5 5 5 5 5 5 5 e f f f f 
                        . . f e e e e e e e e f . f f 
                        . . . f f f f f f f f f . . f 
                        . 4 c f f f f f f f f f c . . 
                        4 4 c f f f f f f f f f 4 4 . 
                        . . . f f f f f f f f f . . . 
                        . . . f f f f f f f f f . . . 
                        . . . e e c . . . . . c e e . 
                        . . . . . . . . . . . . e . . 
                        `)
                }
            }
        } else if (mySprite.vx == 0) {
            if (direction == 0) {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . . f f f f f f f . . . . 
                        . . . f f f f f f f f f . . . 
                        . . f f f f f f f f f f f . . 
                        . f f f f f e e e e e e f f . 
                        . f f f e e 4 4 4 4 4 e e f . 
                        . f f e e 4 f 4 4 4 f 4 e f . 
                        . f f e 4 4 4 4 4 4 4 4 e f . 
                        . f f e e 4 4 3 3 3 4 4 e f . 
                        . f f f e e 4 4 4 4 4 e e f . 
                        . f f f f f e e e e e e f . . 
                        . f f f f f f f f f f f f f . 
                        . f f f f f f f f f f f f f . 
                        . f f f c c f f f f f f c c . 
                        . . f f 4 4 f f f f f f 4 4 . 
                        . . f f f f f f f f f f f . . 
                        . . . . c e e . . c e e . . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . . f f f f f f f . . . . 
                        . . . f f f f f f f f f . . . 
                        . . f f f f f f f f f f f . . 
                        . f f f f 5 5 5 5 5 5 5 f f . 
                        . f f f 5 5 4 4 5 4 4 5 5 f . 
                        . f f 5 5 4 f 4 5 4 f 4 5 f . 
                        . f f 5 5 4 4 5 5 5 4 4 5 f . 
                        . f f 5 5 5 5 5 5 5 5 5 5 f . 
                        . f f f e e 4 4 4 4 4 e e f . 
                        . f f f f f e e e e e e f . . 
                        . f f f f f f f f f f f f f . 
                        . f f f f f f f f f f f f f . 
                        . f f f c c f f f f f f c c . 
                        . . f f 4 4 f f f f f f 4 4 . 
                        . . f f f f f f f f f f f . . 
                        . . . . c e e . . c e e . . . 
                        `)
                }
            } else {
                if (mainPlayerStyle == 0) {
                    mySprite.setImage(img`
                        . . . . f f f f f f f . . . . 
                        . . . f f f f f f f f f . . . 
                        . . f f f f f f f f f f f . . 
                        . f f e e e e e e f f f f f . 
                        . f e e 4 4 4 4 4 e e f f f . 
                        . f e 4 f 4 4 4 f 4 e e f f . 
                        . f e 4 4 4 4 4 4 4 4 e f f . 
                        . f e 4 4 3 3 3 4 4 e e f f . 
                        . f e e 4 4 4 4 4 e e f f f . 
                        . . f e e e e e e f f f f f . 
                        . f f f f f f f f f f f f f . 
                        . f f f f f f f f f f f f f . 
                        . c c f f f f f f c c f f f . 
                        . 4 4 f f f f f f 4 4 f f . . 
                        . . f f f f f f f f f f f . . 
                        . . . e e c . . e e c . . . . 
                        `)
                } else {
                    mySprite.setImage(img`
                        . . . . f f f f f f f . . . . 
                        . . . f f f f f f f f f . . . 
                        . . f f f f f f f f f f f . . 
                        . f f 5 5 5 5 5 5 5 f f f f . 
                        . f 5 5 4 4 5 4 4 5 5 f f f . 
                        . f 5 4 f 4 5 4 f 4 5 5 f f . 
                        . f 5 4 4 5 5 5 4 4 5 5 f f . 
                        . f 5 5 5 5 5 5 5 5 5 5 f f . 
                        . f e e 4 4 4 4 4 e e f f f . 
                        . . f e e e e e e f f f f f . 
                        . f f f f f f f f f f f f f . 
                        . f f f f f f f f f f f f f . 
                        . c c f f f f f f c c f f f . 
                        . 4 4 f f f f f f 4 4 f f . . 
                        . . f f f f f f f f f f f . . 
                        . . . e e c . . e e c . . . . 
                        `)
                }
            }
        } else {
        	
        }
    }
    if (mySprite.y >= 248) {
        game.over(false, effects.melt)
    }
    mySprite.ay = 350
})
game.onUpdateInterval(1, function () {
    if (mySprite.y >= 248) {
        game.over(false, effects.melt)
    }
})
