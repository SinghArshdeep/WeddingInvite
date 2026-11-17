"""Generates an original, copyright-free santoor-style instrumental loop.

Run: python3 scripts/synth-music.py
Output: public/audio/wedding-instrumental.wav
Replace the output file (and config/wedding.ts music.src) with your own track at any time.
"""
import math, random, wave, array

SR = 22050
BPM = 66
BEAT = 60.0 / BPM
BARS = 16
DUR = BARS * 4 * BEAT + 3.0
N = int(SR * DUR)
out = array.array('f', [0.0]) * N
random.seed(11)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12.0)


def pluck(start, midi, amp, length=2.6, bright=0.5):
    f = hz(midi)
    period = max(2, int(SR / f))
    buf = [random.uniform(-1, 1) for _ in range(period)]
    for _ in range(2):
        buf = [(buf[i] + buf[i - 1]) * 0.5 for i in range(period)]
    s0 = int(start * SR)
    L = int(length * SR)
    decay = 0.996 + 0.003 * bright
    idx = 0
    for n in range(L):
        i = s0 + n
        if i >= N:
            break
        a = buf[idx]
        b = buf[(idx + 1) % period]
        buf[idx] = decay * 0.5 * (a + b)
        idx = (idx + 1) % period
        out[i] += a * amp * min(1.0, n / 40.0)


scale = [62, 64, 66, 69, 71, 74, 76, 78, 81]
chords = [[50, 57], [47, 54], [55, 62], [52, 57]]

for i in range(N):
    t = i / SR
    swell = 0.55 + 0.45 * math.sin(2 * math.pi * t / 7.0) ** 2
    v = 0.0
    for m, a in ((38, 0.05), (45, 0.035), (50, 0.03), (57, 0.015)):
        f = hz(m)
        v += a * (math.sin(2 * math.pi * f * t) + 0.3 * math.sin(4 * math.pi * f * t + 0.5))
    out[i] += v * swell * 0.6

motif = None
for bar in range(BARS):
    t0 = 1.0 + bar * 4 * BEAT
    root = chords[(bar // 2) % 4]
    pluck(t0, root[0], 0.22, 4.0, 0.2)
    pluck(t0 + 2 * BEAT, root[1], 0.15, 3.0, 0.2)
    if bar % 4 == 0 or motif is None:
        motif = []
        p = random.choice([2, 3, 4, 5])
        for step in range(8):
            p = max(0, min(len(scale) - 1, p + random.choice([-2, -1, -1, 0, 1, 1, 2])))
            motif.append(p if random.random() > 0.18 else None)
    for step, note in enumerate(motif):
        if note is None or (bar % 4 == 3 and step > 5):
            continue
        jitter = random.uniform(-0.012, 0.012)
        amp = 0.32 if step % 2 == 0 else 0.22
        pluck(t0 + step * BEAT / 2 + jitter, scale[note], amp, 2.4, 0.6)
        if random.random() < 0.25:
            pluck(t0 + step * BEAT / 2 + BEAT / 4, scale[note], amp * 0.5, 1.6, 0.6)


def comb(sig, delay_s, fb):
    d = int(delay_s * SR)
    res = array.array('f', sig)
    for i in range(d, len(res)):
        res[i] += res[i - d] * fb
    return res


wet = array.array('f', [0.0]) * N
for ds, fb in ((0.0297, 0.72), (0.0371, 0.70), (0.0411, 0.68), (0.0437, 0.66)):
    c = comb(out, ds, fb)
    for i in range(N):
        wet[i] += c[i] * 0.12

mix = [out[i] * 0.75 + wet[i] for i in range(N)]
peak = max(abs(x) for x in mix) or 1.0
fade = int(SR * 2.5)
frames = array.array('h')
for i, x in enumerate(mix):
    g = 1.0
    if i < SR // 2:
        g = i / (SR / 2)
    elif i > N - fade:
        g = (N - i) / fade
    frames.append(int(max(-1, min(1, x / peak * 0.8 * g)) * 32767))

with wave.open('public/audio/wedding-instrumental.wav', 'wb') as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(frames.tobytes())
print('done', round(DUR, 1), 's')
