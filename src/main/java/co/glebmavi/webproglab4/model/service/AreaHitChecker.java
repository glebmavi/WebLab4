package co.glebmavi.webproglab4.model.service;

public class AreaHitChecker {

    public static final double MIN_X = -5, MAX_X = 3;
    public static final double MIN_Y = -5, MAX_Y = 5;
    public static final double MIN_R = 0, MAX_R = 3;
    public static boolean isHit(double x, double y, double r) {
        if (variablesValidation(x, y, r)) return isRectangle(x, y, r) || isTriangle(x, y, r) || isCircle(x, y, r);
        return false;
    }

    private static boolean variablesValidation(double x, double y, double r) {
        return (x >= MIN_X && x <= MAX_X) && (y >= MIN_Y && y <= MAX_Y) && (r >= MIN_R && r <= MAX_R);
    }

    private static boolean isRectangle(double x, double y, double r) {
        return x >= 0 && x <= r && y >= 0 && y <= r/2;
    }

    private static boolean isTriangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && y >= x - r/2;
    }

    private static boolean isCircle(double x, double y, double r) {
        return x <= 0 && y >= 0 && x * x + y * y <= r * r;
    }
}
